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
var adminUser, adminToken, customer, user, userToken;

describe('Delete Customer', function (done) {
  before((done) => {
    adminUser = new UserModel({
      email: 'andres.dicamillo@gmail.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    user = new UserModel({
      email: 'andres.dicamillo@gmail.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    adminUser.save().then(function (adminUser) {
      user.save().then((user) => {
        userToken = 'Bearer ' + jwt.sign({ email: user.email, roles: user.roles }, SECRET);
        adminToken = 'Bearer ' + jwt.sign({ email: adminUser.email, roles: adminUser.roles }, SECRET);
        customer = new CustomerModel({
          admin: adminUser._id,
          name: 'Customer name One',
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
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => {
      CustomerModel.remove({}, (err) => { done(); });
    });
  });

  it('should not  delete the customer', function (done) {
    chai.request(server)
      .delete(`/customers/${customer._id}`)
      .set('Authorization', userToken)
      .query({})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should update the customer', function (done) {
    chai.request(server)
      .delete(`/customers/${customer._id}`)
      .set('Authorization', adminToken)
      .query({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.not.have.property('error');
        assert.equal(res.body.status, 'deleted');
        done();
      });
  });



});