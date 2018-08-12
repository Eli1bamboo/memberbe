/* by: @andresdicamillo
 * source: https://www.codementor.io/davidtang/unit-testing-and-tdd-in-node-js-part-1-8t714s877
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = "test"
var chai = require("chai")
var UserModel = require("../../../models/user-model")
let chaiHttp = require("chai-http")
let server = require("../../../server")
var http = require("http")
var assert = require("assert")
let should = chai.should()
chai.use(chaiHttp)
const jwt = require("jsonwebtoken")
const SECRET = Buffer.from(process.env.SHARED_SECRET, "base64")
describe("Current User", function(done) {
  before((done) => {
    user = new UserModel({
      email: "pablo.admin@membrify.com",
      firstName: "Andres",
      lastName: "",
      passwordHash: "1234",
      roles: ["USER"]
    })
    user.save().then(function (user) {
      token = "Bearer " + jwt.sign({ email: user.email, roles: user.roles }, SECRET)
      done()
    })
  })

  after(function(done) {
    UserModel.remove({}, (err) => { done()})
  })

  it("should return customerId error", function (done) {
    chai.request(server)
      .get("/users/current")
      .set("Authorization", token)
      .query({})
      .end((err, res) => {
        res.should.have.status(200)
        assert.equal(res.body.status, "ok")
        assert.equal(res.body.user.roles[0], "USER") /* Default value has to be `USER` */
        assert.equal(res.body.user.active, true) /* Default status has to be `true` */
        assert.equal(res.body.user._id, user._id)
        assert.equal(res.body.message, "Current user info provided successfully")
        done()
      })
  })
  
})