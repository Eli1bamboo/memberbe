/* by: @andresdicamillo
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = "test"
// var chai = require('chai');
var UserModel = require("../../../models/user-model")
// var CustomerModel = require('../../../models/customer-model');
let chaiHttp = require("chai-http")
let server = require("../../../server")
var http = require("http")
var assert = require("assert")
// let should = chai.should();
// chai.use(chaiHttp);
const { PRODUCT_TYPE_OPTIONS } = require("../../../constants")
const productFactory = require("../../factory/product")
var user, token

describe("MODEL Product Create", function (done) {
  before((done) => {
    done()
  })
  after((done) => {
    productFactory.removeAll().then(() =>
      productFactory.removeAll().then(() => done())
    )
  })
  // it('should a valid product', function (done) {
  //   var data = {
  //     type: PRODUCT_TYPE_OPTIONS[0],
  //     name: 'My special product',
  //     description: 'This is the description of my special product :)'
  //   };
  //   productFactory.create(data).then((product) => {
  //     assert.notEqual(product._id, null);
  //     assert.equal(product.name, data.name);
  //     assert.equal(product.description, data.description);
  //     assert.equal(product.type, data.type);
  //     done();
  //   });
  // });
  it("should create more than 2 valid products", function (done) {
    productFactory.create().then((p1) => {
      productFactory.create().then((p2) => {
        assert.notEqual(p2.sku, p1.sku)
        productFactory.create().then((p3) => {
          assert.notEqual(p3.sku, p2.sku)
          done()
        })
      })
    })
  })

})