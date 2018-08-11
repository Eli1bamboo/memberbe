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

describe('Update Customer', function (done) {
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

  it('should update the customer', function (done) {
    const params = {
        admin: adminUser._id,
        name: 'My Customer One',
        accountName: ACCOUNT_NAME_OPTIONS[1],
        accountType: ACCOUNT_TYPE_OPTIONS[1],
        website: 'paclab-analytics.co',
        billingAddress: 'My Billin Address',
        phoneNumber: '00555555555',
        installationAddress: 'MyInstallation Address',
        annualSalesRevenue: ANNUAL_SALES_REVENUE_OPTIONS[1],
        annualVolume: 10,
        annualVolumeUnit: ANNUAL_VOLUME_UNIT_OPTIONS[1],
        shippingAddress: 'My Shipping Address',
        email: 'customer.mail@paclab-analytics.com',
        accountSource: 'My Account Source',
        industryVertical: INDUSTRY_VERTICAL_OPTIONS[1]
      };
    chai.request(server)
      .put(`/customers/${customer._id}`)
      .set('Authorization', adminToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.not.have.property('error');
        assert.equal(res.body.status, 'updated');
        assert.equal(res.body.customer.name, params.name)
        assert.equal(res.body.customer.accountName, params.accountName)
        assert.equal(res.body.customer.accountType, params.accountType)
        assert.equal(res.body.customer.website, params.website)
        assert.equal(res.body.customer.billingAddress, params.billingAddress)
        assert.equal(res.body.customer.phoneNumber, params.phoneNumber)
        assert.equal(res.body.customer.installationAddress, params.installationAddress)
        assert.equal(res.body.customer.annualSalesRevenue, params.annualSalesRevenue)
        assert.equal(res.body.customer.annualVolume['$numberDecimal'], params.annualVolume)
        assert.equal(res.body.customer.annualVolumeUnit, params.annualVolumeUnit)
        assert.equal(res.body.customer.shippingAddress, params.shippingAddress)
        assert.equal(res.body.customer.email, params.email)
        assert.equal(res.body.customer.accountSource, params.accountSource)
        assert.equal(res.body.customer.industryVertical, params.industryVertical)
       
        done();
      });
  });

});