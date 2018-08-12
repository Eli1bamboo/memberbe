/* by: @andresdicamillo
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = "test"
var chai = require("chai")
var UserModel = require("../../../models/user-model")
// var CustomerModel = require('../../../models/customer-model');
let chaiHttp = require("chai-http")
let server = require("../../../server")
var http = require("http")
var assert = require("assert")
let should = chai.should()
chai.use(chaiHttp)
const { PRODUCT_TYPE_OPTIONS } = require("../../../constants")
const SECRET = Buffer.from(process.env.SHARED_SECRET, "base64")
const jwt = require("jsonwebtoken")
const userFactory = require("../../factory/user")
const productFactory = require("../../factory/product")
// const customerFactory = require('../../factory/customer');

var user, token, product, anyToken
describe("Update Product", function (done) {
  before((done) => {
    userFactory.create({roles: ["SYS_ADMIN"]}).then((u)=>{
      user = u
      token = "Bearer " + jwt.sign({ email: user.email, roles: user.roles }, SECRET)
      // customerFactory.create({admin: u._id}).then((c)=>{
      //   customer = c;
      data = {} // {customer: customer._id}
      productFactory.create(data).then((p)=>{
        product = p
        userFactory.create().then((usr)=>{
          anyToken = "Bearer " + jwt.sign({ email: usr.email, roles: usr.roles }, SECRET)
          done()
        })
      })
      // });
    })
  })
  after((done) => {
    userFactory.removeAll().then(()=>
      // customerFactory.removeAll().then(()=>
      productFactory.removeAll().then(()=> 
        productFactory.removeAll().then(()=> done()) 
      )
      // )
    )
  })

  it("should return user not has permissions", function (done) {
    const params = {
    }
    chai.request(server)
      .put(`/products/${product._id}`)
      .set("Authorization", anyToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(401)
        assert.equal(res.error.text, "User does not have access to this endpoint, user is not Sys Admin")
        done()
      })
  })
  it("should return product updated", function (done) {
    const params = {
      // customerId: String(customer._id)
      sku: "my-sku-001"
    }
    chai.request(server)
      .put(`/products/${product._id}`)
      .set("Authorization", token)
      .query(params)
      .end((err, res) => {
        res.should.have.status(200)
        assert.equal(res.body.message, "Product Updated Successfully")
        assert.equal(res.body.status, "updated")
        res.body.should.have.property("product")
        assert.equal(res.body.product._id, product._id)
        assert.equal(res.body.product.sku, params.sku)
        assert.equal(res.body.product.description, product.description)
        // assert.equal(res.body.product.sku, product.sku);
        assert.equal(res.body.product.type, product.productType)
        assert.equal(res.body.product.type, product.type)
        assert.equal(res.body.product.name, product.name)
        // assert.equal(res.body.product.customer, product.customer);
        done()
      })
  })

})