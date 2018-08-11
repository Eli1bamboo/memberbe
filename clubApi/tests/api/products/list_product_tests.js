/* by: @andresdicamillo
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = 'test';
var chai = require('chai');
var UserModel = require('../../../models/user-model');
// var CustomerModel = require('../../../models/customer-model');
let chaiHttp = require('chai-http');
let server = require('../../../server');
var http = require('http');
var assert = require('assert');
let should = chai.should();
chai.use(chaiHttp);
const { PRODUCT_TYPE_OPTIONS } = require('../../../constants');
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const jwt = require('jsonwebtoken');
const userFactory = require('../../factory/user');
const productFactory = require('../../factory/product');
// const customerFactory = require('../../factory/customer');

var user, token, product, anyUser, anyToken;
describe('Delete Product', function (done) {
  before((done) => {
    userFactory.create({roles: ['SYS_ADMIN']}).then((u)=>{
      user = u;
      token = 'Bearer ' + jwt.sign({ email: user.email, roles: user.roles }, SECRET);
      // customerFactory.create({admin: u._id}).then((c)=>{
      //   customer = c;
      var data = {}; //{customer: customer._id}
      productFactory.create(data).then((p)=>{
        product = p;
        userFactory.create().then((usr)=>{
          anyUser = usr;
          anyToken = 'Bearer ' + jwt.sign({ email: anyUser.email, roles: anyUser.roles }, SECRET);
          done();
        });
      })
      // });
    });
  });
  after((done) => {
    userFactory.removeAll().then(()=>
      // customerFactory.removeAll().then(()=>
      productFactory.removeAll().then(()=> 
          productFactory.removeAll().then(()=> done()) 
      )
      // )
    );
  });

  it('should return a list of Products', function (done) {
    const params = {
      // customerId: String(customer._id)
    };
    chai.request(server)
      .get(`/products`)
      .set('Authorization', token)
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 'ok');
        assert.equal(res.body.products.length, 1);
        assert.equal(res.body.products[0]._id, product._id);
        done();
      });
  });
  it('should not return a list of Products for any user', function (done) {
    const params = {
      // customerId: String(customer._id)
    };
    chai.request(server)
      .get(`/products`)
      .set('Authorization', anyToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal(res.error.text, 'User need to be Admin or SysAdmin to access to this endpoint');
        done();
      });
  });

});