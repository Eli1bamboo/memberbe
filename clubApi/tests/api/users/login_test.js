/* by: @andresdicamillo
 * source: https://www.codementor.io/davidtang/unit-testing-and-tdd-in-node-js-part-1-8t714s877
 * mocha tests --recursive --watch
 */
process.env.NODE_ENV = 'test';
var chai = require('chai');
var UserModel = require('../../../models/user-model');
let chaiHttp = require('chai-http');
let server = require('../../../server');
var http = require('http');
var assert = require('assert');
let should = chai.should();
chai.use(chaiHttp);
const userFactory = require('../../factory/user');
var user;

describe('Login User', function(done) {
  before((done) => {
    userFactory.create().then((u)=>{
      user = u;
      done();
    });
  });

	after(function(done) {
		UserModel.remove({}, (err) => { done();});
  });

  it('should return empty token, user, and status from API', function(done) {
    chai.request(server)
      .post('/users/login')
      .query({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user').eql(null);
        res.body.should.not.have.property('errors');
        assert.equal(res.body.user, null)
        assert.equal(res.body.token, null)
        assert.equal(res.body.message, 'User not found')
        done();
      });
  });
  it('should return Invalid password', function(done) {
    let params = {
        email: user.email,
        password: 'invalidpass'
      }
    chai.request(server)
      .post('/users/login')
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        assert.equal(res.body.status, 'ok')
        assert.equal(res.body.message, 'Invalid Password')
        done();
      });
  });
  it('should return a valid user and token', function(done) {
    let params = {
      email: user.email,
      password: '1234'
    }
    chai.request(server)
      .post('/users/login')
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        assert.equal(res.body.status, 'ok')
        assert.notEqual(res.body.token, null)
        done();
      });
  });

});