/* by: @andresdicamillo
 * test that allow to verify if password is successfully changed
 * Note: The step one will generate a mail with a token, in the 
 * step two we will to create a new password for the user
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
var user, token, customer;

describe('Change User\'s password', function (done) {
  before((done) => {
    user = new UserModel({
      email: 'user@membrify.com',
      firstName: 'User',
      lastName: 'Missed',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    user.save().then(function (user) {
      token = 'Bearer ' + jwt.sign({ email: user.email, roles: user.roles }, SECRET);
      done();
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => { done(); });
  });

  it('should return invalid password', function (done) {
    const params = { currentPassword: '123', newPassword: '123456'};
    chai.request(server)
      .post('/users/change-password')
      .set('Authorization', token)
      .query(params)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal(res.body.status, 'error')
        assert.equal(res.body.message, 'Invalid Pasword')
        done();
      });
  });
  it('should return Invalid token', function (done) {
    const params = { currentPassword: '123', newPassword: '123456'};
    chai.request(server)
      .post('/users/change-password')
      .set('Authorization', null)
      .query(params)
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal(res.error.text, 'Invalid token user api...')
        done();
      });
  });
  describe('Once Password changed', function (done) {
    before((done) => {
      const params = { currentPassword: '1234', newPassword: '123456'};
      chai.request(server)
        .post('/users/change-password')
        .set('Authorization', token)
        .query(params)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.status, 'ok')
          assert.equal(res.body.message, 'Password Changed Successfully')
          done();
        });
    });
    it('should return a valid user and token login', function(done) {
      let user = {
          email: "user@membrify.com",
          password: "123456"
        }
      chai.request(server)
        .post('/users/login')
        .query(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.should.have.property('token');
          assert.equal(res.body.status, 'ok')
          assert.notEqual(res.body.token, null)
          done();
        });
    });
  });



});