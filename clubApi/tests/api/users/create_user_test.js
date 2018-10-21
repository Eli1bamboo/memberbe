/* by: @andresdicamillo
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = 'test';
var chai = require('chai');
var UserModel = require('../../../models/user-model');
var CustomerModel = require('../../../models/customer-model');
let chaiHttp = require('chai-http');
let server = require('../../../server');
var http = require('http');
var assert = require('assert');
let should = chai.should();
chai.use(chaiHttp);
const {
  ACCOUNT_NAME_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
  ANNUAL_SALES_REVENUE_OPTIONS,
  ANNUAL_VOLUME_UNIT_OPTIONS,
  INDUSTRY_VERTICAL_OPTIONS } = require('../../../constants');
const UserManager = require('../../../services/user-manager');
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const jwt = require('jsonwebtoken');
var adminUser, adminToken, sysUser, sysToken, customer, newUser, invalidToken;

describe('Create User', function (done) {
  before((done) => {
    adminUser = new UserModel({
      email: 'pablo.admin@memberbe.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    adminUser.save().then(function (adminUser) {
      adminToken = 'Bearer ' + jwt.sign({ email: adminUser.email, roles: adminUser.roles }, SECRET);

      sysUser = new UserModel({
        email: 'sys.admin@memberbe.com',
        firstName: 'Andres',
        lastName: '',
        roles: ['SYS_ADMIN'],
        passwordHash: '1234'
      });
      sysUser.save().then(function (sysUser) {
        sysToken = 'Bearer ' + jwt.sign({ email: sysUser.email, roles: sysUser.roles }, SECRET);
        done();
      });
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => { done(); });
  });

  it('should return customerId error', function (done) {
    const params = { email: 'user.1@memberbe.com', firstName: 'User One', lastName: 'LastName One', customerId: '' };
    chai.request(server)
      .post('/users/create')
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('error');
        assert.equal(res.body.status, 'unsuccessfull')
        assert.equal(res.body.error._message, 'user validation failed')
        done();
      });
  });
  it('should return email, firstName and lastName error', function (done) {
    const params = {};
    chai.request(server)
      .post('/users/create')
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('error');
        res.body.error.errors.should.have.property('firstName');
        res.body.error.errors.should.have.property('lastName');
        res.body.error.errors.should.have.property('email');
        assert.equal(res.body.status, 'unsuccessfull')
        assert.equal(res.body.error._message, 'user validation failed')
        done();
      });
  });
  it('should create an user without customer', function (done) {
    const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou@memberbe.com' };
    chai.request(server)
      .post('/users/create')
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('user');
        assert.equal(res.body.status, 'created')
        assert.notEqual(res.body.user._id, null)
        done();
      });
  });
  it('as USER should not create User', function (done) {
    const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou@memberbe.com' };
    chai.request(server)
      .post('/users/create')
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('error');
        assert.equal(res.body.status, 'unsuccessfull')
        done();
      });
  });
  it('as ADMIN should not assign role at create User', function (done) {
    const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou.whitin.roles@memberbe.com', roles: ['ADMIN']};
    chai.request(server)
      .post('/users/create')
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('user');
        assert.equal(res.body.status, 'created')
        assert.notEqual(res.body.user.roles, 'ADMIN')
        assert.notEqual(res.body.user._id, null)
        done();
      });
  });
  it('should create an ADMIN user by SYS_ADMIN role', function (done) {
    const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou.admin@memberbe.com', roles: ['ADMIN'] };
    chai.request(server)
      .post('/users/create')
      .set('Authorization', sysToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('user');
        assert.equal(res.body.status, 'created')
        assert.equal(res.body.user.roles, 'ADMIN')
        assert.notEqual(res.body.user._id, null)
        done();
      });
  });
  it('should create a simple USER user by SYS_ADMIN role', function (done) {
    const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou.user@memberbe.com', roles: ['USER'] };
    chai.request(server)
      .post('/users/create')
      .set('Authorization', sysToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('user');
        assert.equal(res.body.status, 'created')
        assert.equal(res.body.user.roles, 'USER')
        assert.notEqual(res.body.user._id, null)
        done();
      });
  });

  describe('With a Customer', function (done) {
    before((done) => {
      customer = new CustomerModel({
        admin: adminUser._id,
        name: 'CustomerOne',
        accountName: ACCOUNT_NAME_OPTIONS[0],
        accountType: ACCOUNT_TYPE_OPTIONS[0],
        website: 'memberbe.com',
        billingAddress: 'myBillinAddress',
        phoneNumber: '00585555555',
        installationAddress: 'myInstallationAddress',
        annualSalesRevenue: ANNUAL_SALES_REVENUE_OPTIONS[0],
        annualVolume: 100,
        annualVolumeUnit: ANNUAL_VOLUME_UNIT_OPTIONS[0],
        shippingAddress: 'myShippingAddress',
        email: 'customer.mail@memberbe.com',
        accountSource: 'myAccountSource',
        industryVertical: INDUSTRY_VERTICAL_OPTIONS[0]
      });
      customer.save().then(function (customer) { done(); });

    });
    after(function (done) {
      CustomerModel.remove({}, (err) => { done(); });
    });
    it('email already exists', function (done) {
      const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou@memberbe.com', customerId: ''+customer._id};
      chai.request(server)
        .post('/users/create')
        .set('Authorization', adminToken)
        .query(params)
        .end((err, res) => {
          res.body.should.have.property('error');
          assert.equal(res.body.status, 'unsuccessfull')
          assert.equal(res.body.message, 'Email already exists')
          done();
        });
    });
    
    it('should create an user with a customer associated', function (done) {
      const params = { firstName: 'John', lastName: 'Doe', email: 'john.dou2@memberbe.com', customerId: ''+customer._id};
      chai.request(server)
        .post('/users/create')
        .set('Authorization', adminToken)
        .query(params)
        .end((err, res) => {
          newUser = res.body.user;
          res.body.should.have.property('user');
          assert.equal(res.body.status, 'created')
          assert.equal(res.body.user.customerId, customer._id)
          assert.notEqual(res.body.user._id, null)
          done();
        });
    });

    describe('Once user created as ADMIN or SYS_ADMIN', function (done) {
      before((done) => {
          token = jwt.sign({email:newUser.email}, SECRET+'resetPass', { expiresIn: '4h' })
          invalidToken = jwt.sign({email:newUser.email}, SECRET, { expiresIn: '4h' })
          done();
      });
  
      it('should reset the password', function(done) {
        let user = {
            token: token,
            newPassword: "123456"
          }
        chai.request(server)
          .post('/users/retrieve-password-step-two')
          .query(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('user');
            res.body.should.have.property('token');
            assert.equal(res.body.status, 'ok')
            assert.equal(res.body.message, 'Password successfully reseted')
            assert.notEqual(res.body.token, null)
            done();
          });
      });
      it('should not return invalid token', function(done) {
        let user = {
            token: invalidToken,
            newPassword: "123456"
          }
        chai.request(server)
          .post('/users/retrieve-password-step-two')
          .query(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.not.have.property('token');
            assert.equal(res.body.status, 'expired')
            assert.equal(res.body.error.message, 'invalid signature')
            assert.equal(res.body.message, 'Token expired')
            done();
          });
      });
  
    });
  })


});