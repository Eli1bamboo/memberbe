'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.customerAddDoc = function customerAddDoc (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var customerId = req.swagger.params['customerId'].value;
  var docId = req.swagger.params['docId'].value;
  Default.customerAddDoc(authorization,customerId,docId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerCreate = function customerCreate (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var name = req.swagger.params['name'].value;
  Default.customerCreate(authorization,name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerDelete = function customerDelete (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var customerId = req.swagger.params['customerId'].value;
  Default.customerDelete(authorization,customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerGet = function customerGet (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var customerId = req.swagger.params['customerId'].value;
  Default.customerGet(authorization,customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerList = function customerList (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  Default.customerList(authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChangePass = function userChangePass (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var currentPassword = req.swagger.params['currentPassword'].value;
  var newPassword = req.swagger.params['newPassword'].value;
  Default.userChangePass(authorization,currentPassword,newPassword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCreate = function userCreate (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var email = req.swagger.params['email'].value;
  var firstName = req.swagger.params['firstName'].value;
  var lastName = req.swagger.params['lastName'].value;
  var password = req.swagger.params['password'].value;
  var customerId = req.swagger.params['customerId'].value;
  Default.userCreate(authorization,email,firstName,lastName,password,customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogin = function userLogin (req, res, next) {
  var email = req.swagger.params['email'].value;
  var password = req.swagger.params['password'].value;
  Default.userLogin(email,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRetrievePass = function userRetrievePass (req, res, next) {
  var email = req.swagger.params['email'].value;
  Default.userRetrievePass(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRetrievePassTwo = function userRetrievePassTwo (req, res, next) {
  var token = req.swagger.params['token'].value;
  var newPassword = req.swagger.params['newPassword'].value;
  Default.userRetrievePassTwo(token,newPassword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

//dummy line