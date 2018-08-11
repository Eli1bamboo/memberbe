/* by: @andresdicamillo
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
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const jwt = require('jsonwebtoken');
var user, token;
describe('Verify User', function(done) {
  before((done) => {
    UserModel.remove({}, (err) => {});
    user = new UserModel({
      email: 'pablo.donaire@membrify.com',
      firstName: 'Andres',
      lastName: '',
      customerId: null,
      passwordHash: '1234'
    });
    user.save().then(function (user){ 
        token = 'Bearer ' + jwt.sign({ email: user.email, roles: user.roles }, SECRET);
        done();
    });
  });

	after(function(done) {
		UserModel.remove({}, (err) => { done();});
  });

  it('should not have a valid access to UPLOAD_FILES', function(done) {
    const params = {accessTo: 'UPLOAD_FILES'};
    chai.request(server)
      .get('/verify')
      .set('Authorization', token)
      .query(params)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  

});