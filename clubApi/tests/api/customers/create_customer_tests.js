/* by: @andresdicamillo
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = "test"
var chai = require("chai")
var UserModel = require("../../../models/user-model")
var CustomerModel = require("../../../models/customer-model")
let chaiHttp = require("chai-http")
let server = require("../../../server")
var http = require("http")
var assert = require("assert")
let should = chai.should()
chai.use(chaiHttp)
const {
  ACCOUNT_NAME_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
  ANNUAL_SALES_REVENUE_OPTIONS,
  ANNUAL_VOLUME_UNIT_OPTIONS,
  INDUSTRY_VERTICAL_OPTIONS } = require("../../../constants")
const UserManager = require("../../../services/user-manager")
const SECRET = Buffer.from(process.env.SHARED_SECRET, "base64")
const jwt = require("jsonwebtoken")
var adminUser, adminToken, sysUser, sysToken, customer, newUser, invalidToken

describe("Create Customer", function (done) {
  before((done) => {
    adminUser = new UserModel({
      email: "andres.dicamillo@gmail.com",
      firstName: "Andres",
      lastName: "Di Camillo",
      roles: ["ADMIN"],
      passwordHash: "1234"
    })
    adminUser.save().then(function (adminUser) {
      adminToken = "Bearer " + jwt.sign({ email: adminUser.email, roles: adminUser.roles }, SECRET)
      done()
    })

  })
  after(function (done) {
    UserModel.remove({}, (err) => { 
      CustomerModel.remove({}, (err) => { done() })
    })
  })

  it("should return form error", function (done) {
    const params = {}
    chai.request(server)
      .post("/customers")
      .set("Authorization", adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property("error")
        assert.equal(res.body.status, "unsuccessfull")
        assert.equal(res.body.error._message, "customer validation failed")
        res.body.error.message.should.contains("name")
        res.body.error.message.should.contains("accountName")
        res.body.error.message.should.contains("accountType")
        res.body.error.message.should.contains("website")
        res.body.error.message.should.contains("billingAddress")
        res.body.error.message.should.contains("phoneNumber")
        res.body.error.message.should.contains("installationAddress")
        res.body.error.message.should.contains("annualSalesRevenue")
        res.body.error.message.should.contains("annualVolume")
        res.body.error.message.should.contains("annualVolumeUnit")
        res.body.error.message.should.contains("shippingAddress")
        res.body.error.message.should.contains("email")
        res.body.error.message.should.contains("accountSource")
        res.body.error.message.should.contains("industryVertical")
        done()
      })
  })
  it("should return invalid account name error", function (done) {
    const params = {
      admin: adminUser._id,
      name: "CustomerOne",
      accountName: "invalid option",
      accountType: "invalid option",
      website: "membrify.com",
      billingAddress: "myBillinAddress",
      phoneNumber: "00585555555",
      installationAddress: "myInstallationAddress",
      annualSalesRevenue: "invalid option",
      annualVolume: 100,
      annualVolumeUnit: "invalid option",
      shippingAddress: "myShippingAddress",
      email: "customer.mail@membrify.com",
      accountSource: "myAccountSource",
      industryVertical: "invalid option"
    }
    
    chai.request(server)
      .post("/customers")
      .set("Authorization", adminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property("error")
        assert.equal(res.body.status, "unsuccessfull")
        assert.equal(res.body.error._message, "customer validation failed")
        res.body.error.message.should.contains("accountName")
        res.body.error.message.should.contains("accountType")
        res.body.error.message.should.contains("annualSalesRevenue")
        res.body.error.message.should.contains("annualVolumeUnit")
        res.body.error.message.should.contains("industryVertical")
        done()
      })
  })
  it("should create a valid customer", function (done) {
    const params = {
      admin: adminUser._id,
      name: "myCustomerOne",
      accountName: ACCOUNT_NAME_OPTIONS[0],
      accountType: ACCOUNT_TYPE_OPTIONS[0],
      website: "membrify.com",
      billingAddress: "myBillinAddress",
      phoneNumber: "00585555555",
      installationAddress: "myInstallationAddress",
      annualSalesRevenue: ANNUAL_SALES_REVENUE_OPTIONS[0],
      annualVolume: 100,
      annualVolumeUnit: ANNUAL_VOLUME_UNIT_OPTIONS[0],
      shippingAddress: "myShippingAddress",
      email: "customer.mail@membrify.com",
      accountSource: "myAccountSource",
      industryVertical: INDUSTRY_VERTICAL_OPTIONS[0]
    }
    
    chai.request(server)
      .post("/customers")
      .set("Authorization", adminToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.have.property("customer")
        assert.equal(res.body.status, "created")
        assert.equal(res.body.customer.name, params.name)
        assert.equal(res.body.customer.accountName, params.accountName)
        assert.equal(res.body.customer.accountType, params.accountType)
        assert.equal(res.body.customer.website, params.website)
        assert.equal(res.body.customer.billingAddress, params.billingAddress)
        assert.equal(res.body.customer.phoneNumber, params.phoneNumber)
        assert.equal(res.body.customer.installationAddress, params.installationAddress)
        assert.equal(res.body.customer.annualSalesRevenue, params.annualSalesRevenue)
        assert.equal(res.body.customer.annualVolume["$numberDecimal"], params.annualVolume)
        assert.equal(res.body.customer.annualVolumeUnit, params.annualVolumeUnit)
        assert.equal(res.body.customer.shippingAddress, params.shippingAddress)
        assert.equal(res.body.customer.email, params.email)
        assert.equal(res.body.customer.accountSource, params.accountSource)
        assert.equal(res.body.customer.industryVertical, params.industryVertical)
        done()
      })
  })

})