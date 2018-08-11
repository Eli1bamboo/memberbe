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
var adminUser, adminToken, customer;

describe('Get Customer', function (done) {
  before((done) => {
    adminUser = new UserModel({
      email: 'pablo.admin@membrify.com',
      firstName: 'Andres',
      lastName: '',
      roles: ['ADMIN'],
      passwordHash: '1234'
    });
    adminUser.save().then(function (adminUser) {
      adminToken = 'Bearer ' + jwt.sign({ email: adminUser.email, roles: adminUser.roles }, SECRET);
      customer = new CustomerModel({
        admin: adminUser._id,
        name: 'Customer name one',
        accountName: ACCOUNT_NAME_OPTIONS[0],
        accountType: ACCOUNT_TYPE_OPTIONS[0],
        website: 'membrify.com',
        billingAddress: 'myBillinAddress',
        phoneNumber: '00585555555',
        installationAddress: 'myInstallationAddress',
        annualSalesRevenue: ANNUAL_SALES_REVENUE_OPTIONS[0],
        annualVolume: 100,
        annualVolumeUnit: ANNUAL_VOLUME_UNIT_OPTIONS[0],
        shippingAddress: 'myShippingAddress',
        email: 'customer.mail@membrify.com',
        accountSource: 'myAccountSource',
        industryVertical: INDUSTRY_VERTICAL_OPTIONS[0]
      });
      customer.save().then(function (customer) { done(); });
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => { 
      CustomerModel.remove({}, (err) => { done(); });
    });
  });

  it('should get the customer info', function (done) {
    chai.request(server)
      .get(`/customers/${customer._id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 'ok');
        assert.equal(res.body.customer.name, customer.name)
        assert.equal(res.body.customer.accountName, customer.accountName)
        assert.equal(res.body.customer.accountType, customer.accountType)
        assert.equal(res.body.customer.website, customer.website)
        assert.equal(res.body.customer.billingAddress, customer.billingAddress)
        assert.equal(res.body.customer.phoneNumber, customer.phoneNumber)
        assert.equal(res.body.customer.installationAddress, customer.installationAddress)
        assert.equal(res.body.customer.annualSalesRevenue, customer.annualSalesRevenue)
        assert.equal(res.body.customer.annualVolume['$numberDecimal'], customer.annualVolume)
        assert.equal(res.body.customer.annualVolumeUnit, customer.annualVolumeUnit)
        assert.equal(res.body.customer.shippingAddress, customer.shippingAddress)
        assert.equal(res.body.customer.email, customer.email)
        assert.equal(res.body.customer.accountSource, customer.accountSource)
        assert.equal(res.body.customer.industryVertical, customer.industryVertical)
       
        done();
      });
  });

});