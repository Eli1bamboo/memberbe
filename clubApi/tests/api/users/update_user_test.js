/* by: @andresdicamillo
 * source: https://www.codementor.io/davidtang/unit-testing-and-tdd-in-node-js-part-1-8t714s877
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = "test"
var chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../../../server")
var http = require("http")
var assert = require("assert")
let should = chai.should()
var UserModel = require("../../../models/user-model")
var CustomerModel = require("../../../models/customer-model")
const jwt = require("jsonwebtoken")
const SECRET = Buffer.from(process.env.SHARED_SECRET, "base64")
chai.use(chaiHttp)
const {
  ACCOUNT_NAME_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
  ANNUAL_SALES_REVENUE_OPTIONS,
  ANNUAL_VOLUME_UNIT_OPTIONS,
  INDUSTRY_VERTICAL_OPTIONS } = require("../../../constants")

var token, customer, passwordHash
describe("Update User", function(done) {
  before((done) => {
    var user = new UserModel({
      email: "pablo.donaire@membrify.com",
      firstName: "firstN",
      lastName: "lastN",
      customerId: null,
      passwordHash: "1234",
      roles: ["ADMIN"]
    })
    user.save().then(function (user){ 
      token = "Bearer " + jwt.sign({ email: user.email, roles: user.roles }, SECRET)
      done()
    })
  })

  after(function(done) {
    UserModel.remove({}, (err) => { done()})
  })

  it("should update the User", function(done) {
    var params = {firstName: "Andres", lastName: "Di Camillo"}
    chai.request(server)
      .put("/users")
      .query(params)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("user")
        assert.equal(res.body.user.firstName, params.firstName)
        assert.equal(res.body.user.lastName, params.lastName)
        assert.equal(res.body.status, "updated")
        assert.equal(res.body.message, "User Updated Successfully")
        done()
      })
  })
  describe("With not allowed params", function(done) {
    before((done) => {
      customer = new CustomerModel({
        admin: user._id,
        name: "CustomerOne",
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
      })
      customer.save().then(function (customer) {
        done()
      })
    })
    after(function(done) {
      CustomerModel.remove({}, (err) => { done()})
    })
  
    // updatedAt
    it("should not update email, customerId, active, company_account, role, passwordHash, createdAt", function(done) {
      var params = {
        email: "example@membrify.com", 
        customerId: customer._id, 
        active: false, 
        company_account: "my company", 
        roles: ["SYS_ADMIN"], 
        passwordHash: "123", 
        createdAt: Date.now
      }
      chai.request(server)
        .put("/users")
        .query(params)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          assert.notEqual(res.body.user.email, params.email)
          assert.notEqual(res.body.user.customerId, params.customerId)
          assert.notEqual(res.body.user.active, params.active)
          assert.notEqual(res.body.user.company_account, params.company_account)
          assert.notEqual(res.body.user.roles, params.roles)
          assert.notEqual(res.body.user.passwordHash, params.passwordHash)
          assert.notEqual(res.body.user.createdAt, params.createdAt)
          done()
        })
    })
  })


})