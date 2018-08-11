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
var user, token;

describe('Create Product', function (done) {
  before((done) => {
    userFactory.create().then((u)=>{
      user = u;
      token = 'Bearer ' + jwt.sign({ email: user.email, roles: user.roles }, SECRET);
      userFactory.create({roles: ['SYS_ADMIN']}).then((u)=>{
        sysAdminToken = 'Bearer ' + jwt.sign({ email: u.email, roles: u.roles }, SECRET);
        // customerFactory.create({admin: u._id}).then((c)=>{
        //   customer = c;
          done();
        // });
      });
    });
  });
  after((done) => {
    userFactory.removeAll().then(()=>
      // customerFactory.removeAll().then(()=>
      productFactory.removeAll().then(()=> done() )
      // )
    );
  });

  it('should return user not has permissions', function (done) {
    const params = {
    };
    chai.request(server)
      .post('/products')
      .set('Authorization', token)
      .query(params)
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal(res.error.text, 'User does not have access to this endpoint, user is not Sys Admin');
        done();
      });
  });
  it('should return user params error', function (done) {
    const params = {
      // customerId: String(customer._id)
    };
    chai.request(server)
      .post('/products')
      .set('Authorization', sysAdminToken)
      .query(params)
      .end((err, res) => {
        // var response = JSON.parse(res.error.text);
        var response = res.body;
        response.error.message.should.contains('name');
        response.error.message.should.contains('type');
        response.error.message.should.contains('sku');
        response.error.message.should.contains('productType');
        done();
      });
  });
  it('should return product created', function (done) {
    const params = {
      // customerId: String(customer._id),
      name: 'Product One',
      type: PRODUCT_TYPE_OPTIONS[0],
      sku: '001'
    };
    chai.request(server)
      .post('/products')
      .set('Authorization', sysAdminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('product');
        assert.equal(res.body.status, 'created')
        assert.equal(res.body.message, 'Product created successfully')
        assert.equal(res.body.product.name, params.name);
        assert.equal(res.body.product.type, params.type);
        assert.equal(res.body.product.type, params.productType);
        // assert.equal(res.body.product.customer, params.customerId);
        done();
      });
  });
  it('should create more than 3 products valid with differents sku', function (done) {
    const params = {
      name: 'My Product One',
      type: PRODUCT_TYPE_OPTIONS[0],
      sku: '0001'
    };
    chai.request(server)
      .post('/products')
      .set('Authorization', sysAdminToken)
      .query(params)
      .end((err, res) => {
        res.body.should.have.property('product');
        assert.equal(res.body.status, 'created')
        assert.equal(res.body.message, 'Product created successfully')
        params.name= 'My Product Two';
        params.sku= '0002';
        params.productType= 'product Type';
        chai.request(server)
          .post('/products')
          .set('Authorization', sysAdminToken)
          .query(params)
          .end((err, res) => {
            res.body.should.have.property('product');
            assert.equal(res.body.status, 'created')
            params.name= 'My Product Three';
            params.sku= '0003';
            params.productType= 'product type';
            chai.request(server)
              .post('/products')
              .set('Authorization', sysAdminToken)
              .query(params)
              .end((err, res) => {
                res.body.should.have.property('product');
                assert.equal(res.body.status, 'created')
                params.name= 'My Product Four';
                chai.request(server)
                .post('/products')
                .set('Authorization', sysAdminToken)
                .query(params)
                .end((err, res) => {
                  assert.equal(res.body.message, 'Product sku already exists')
                  // res.body.should.have.property('product');
                  // assert.equal(res.body.status, 'created')
                  done();
                });
              });
          });
      });
  });

});