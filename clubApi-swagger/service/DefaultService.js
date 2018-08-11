'use strict';


/**
 * Add document id to the customer. This endpoint is used by Seach Manager
 *
 * authorization String User token provided
 * customerId String ID of Customer
 * docId String Document Id
 * returns inline_response_201
 **/
exports.customerAddDoc = function(authorization,customerId,docId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "status",
  "customer" : {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create customer/company/module by POST
 *
 * authorization String User token provided
 * name String Customer Name
 * returns inline_response_201
 **/
exports.customerCreate = function(authorization,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "status",
  "customer" : {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete Customer
 *
 * authorization String User token provided
 * customerId String ID of Customer
 * returns inline_response_201
 **/
exports.customerDelete = function(authorization,customerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "status",
  "customer" : {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Customer List of admin loggedin
 *
 * authorization String User token provided
 * customerId String ID of Customer
 * returns inline_response_201
 **/
exports.customerGet = function(authorization,customerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "status",
  "customer" : {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Customer List of admin loggedin
 *
 * authorization String User token provided
 * returns inline_response_200_4
 **/
exports.customerList = function(authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "customers" : [ {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  }, {
    "createdAt" : "createdAt",
    "documents" : [ {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    }, {
      "createdAt" : "createdAt",
      "esId" : "esId",
      "freeText" : "freeText",
      "_id" : "_id",
      "documentPath" : "documentPath",
      "updatedAt" : "updatedAt"
    } ],
    "name" : "name",
    "admin" : "admin",
    "_id" : "_id",
    "users" : [ {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    }, {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "createdAt" : "createdAt",
      "password" : "password",
      "company_account" : "company_account",
      "role" : "role",
      "active" : true,
      "_id" : "_id",
      "email" : "email",
      "updatedAt" : "updatedAt"
    } ],
    "updatedAt" : "updatedAt"
  } ],
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User can change the current password with this endpoint (authentication required)
 *
 * authorization String User token provided
 * currentPassword String User Current Password
 * newPassword String New User Password
 * returns inline_response_200
 **/
exports.userChangePass = function(authorization,currentPassword,newPassword) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message",
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "createdAt" : "createdAt",
    "password" : "password",
    "company_account" : "company_account",
    "role" : "role",
    "active" : true,
    "_id" : "_id",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "status" : "status",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * As Admin of Customer. Create User for customers, this will send an email to the user for create the new password. IMPORTANT NOTE the endpoint for the user created to set the password for the first time is the same than the step two of retrieve password (/users/retrieve-password-step-two)
 *
 * authorization String User token provided
 * email String User email
 * firstName String User first name
 * lastName String User last name
 * password String Password of the user to login
 * customerId String Id of the customer to be user associated (not required) (optional)
 * returns inline_response_200_3
 **/
exports.userCreate = function(authorization,email,firstName,lastName,password,customerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "createdAt" : "createdAt",
    "password" : "password",
    "company_account" : "company_account",
    "role" : "role",
    "active" : true,
    "_id" : "_id",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "status" : "status",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User Login
 *
 * email String Email of the user to login
 * password String Password of the user to login
 * returns inline_response_200
 **/
exports.userLogin = function(email,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message",
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "createdAt" : "createdAt",
    "password" : "password",
    "company_account" : "company_account",
    "role" : "role",
    "active" : true,
    "_id" : "_id",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "status" : "status",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * If User forgot the password he can retrieve the password with this endpoint, this will send an email to the user to set a new password
 *
 * email String User Current Password
 * returns inline_response_200_1
 **/
exports.userRetrievePass = function(email) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * This endpoint is usefull, we can use this as the second part of the last step, or we can use is to set the password by first time, when an Admin creates a new User to the customer.
 *
 * token String User Token generated by the email
 * newPassword String User New password to be created
 * returns inline_response_200_2
 **/
exports.userRetrievePassTwo = function(token,newPassword) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message",
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "createdAt" : "createdAt",
    "password" : "password",
    "company_account" : "company_account",
    "role" : "role",
    "active" : true,
    "_id" : "_id",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "status" : "status",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


//dummy line