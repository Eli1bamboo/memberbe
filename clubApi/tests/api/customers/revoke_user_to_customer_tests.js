/* by: @andresdicamillo
 * Andres  Di Camillo
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
var adminUser, user, adminToken, customer;

describe('Get Customer', function (done) {
  before((done) => {
    adminUser = new UserModel({
      email: 'pablo.admin@memberbe.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    user = new UserModel({
      email: 'pablo.user@memberbe.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['USER'],
      passwordHash: '1234'
    });
    user.save().then(function (user) {
      adminUser.save().then(function (adminUser) {
        adminToken = 'Bearer ' + jwt.sign({ email: adminUser.email, roles: adminUser.roles }, SECRET);
        customer = new CustomerModel({
          admin: adminUser._id,
          name: 'Customer name one',
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
        customer.users.push(user._id);
        customer.save().then(function (customer) { done(); });
      });
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => {
      CustomerModel.remove({}, (err) => { done(); });
    });
  });

  it('should get a list of my customers', function (done) {
    const params = { userId: String(user._id) };
    chai.request(server)
      .post(`/customers/${customer._id}/revoke-user`)
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 'ok');
        res.body.should.have.property('customer');
        assert.equal(res.body.customer.users.length, 0);
        done();
      });
  });

});