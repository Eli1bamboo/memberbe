/* by: @andresdicamillo
 * test that allow to verify if password is successfully changed
 * Note: The step one will generate a mail with a token, in the 
 * step two we will to create a new password for the user
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
const userFactory = require("../../factory/user")
var user, token, invalidToken

describe("User retrieve password", function (done) {
  before((done) => {
    userFactory.create().then((u)=>{
      user = u
      token = "Bearer " + jwt.sign({ email: user.email, roles: user.roles }, SECRET)
      done()
    })

  })
  after(function (done) {
    UserModel.remove({}, (err) => { done() })
  })

  it("should return User not found", function (done) {
    const params = { email: ""}
    chai.request(server)
      .post("/users/retrieve-password-step-one")
      .query(params)
      .end((err, res) => {
        res.should.have.status(400)
        assert.equal(res.body.status, "error")
        assert.equal(res.body.message, "User not found")
        done()
      })
  })
  it("should send email to retrieve password", function (done) {
    const params = { email: user.email}
    chai.request(server)
      .post("/users/retrieve-password-step-one")
      .query(params)
      .end((err, res) => {
        res.should.have.status(200)
        assert.equal(res.body.status, "ok")
        assert.equal(res.body.message, "Retrieve password Link sent Successfully")
        done()
      })
  })
  describe("Once retrieve password's email sent", function (done) {
    before((done) => {
      token = jwt.sign({email:user.email}, SECRET+"resetPass", { expiresIn: "4h" })
      invalidToken = jwt.sign({email:user.email}, SECRET, { expiresIn: "4h" })
      done()
    })

    it("should reset the password", function(done) {
      let user = {
        token: token,
        newPassword: "123456"
      }
      chai.request(server)
        .post("/users/retrieve-password-step-two")
        .query(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          assert.equal(res.body.status, "ok")
          assert.equal(res.body.message, "Password successfully reseted")
          assert.notEqual(res.body.token, null)
          done()
        })
    })
    it("should not reset the password", function(done) {
      let user = {
        token: invalidToken,
        newPassword: "123456"
      }
      chai.request(server)
        .post("/users/retrieve-password-step-two")
        .query(user)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have.property("error")
          res.body.should.not.have.property("token")
          assert.equal(res.body.status, "expired")
          assert.equal(res.body.error.message, "invalid signature")
          assert.equal(res.body.message, "Token expired")
          done()
        })
    })

  })



})