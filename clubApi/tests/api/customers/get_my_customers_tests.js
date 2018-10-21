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
var adminUser, adminToken, customer;

describe('Get Customer', function (done) {
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
      customer.save().then(function (customer) { done(); });
    });

  });
  after(function (done) {
    UserModel.remove({}, (err) => { 
      CustomerModel.remove({}, (err) => { done(); });
    });
  });

  it('should get a list of my customers', function (done) {
    chai.request(server)
      .get(`/customers/`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 'ok');
        res.body.should.have.property('customers');
        assert.equal(res.body.customers.length, 1);
        assert.equal(res.body.customers[0]._id, customer._id);
        
       
        done();
      });
  });

});