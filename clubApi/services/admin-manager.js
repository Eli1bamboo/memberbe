

const UserModel = require('../models/admin-model');
const { sendMail } = require('../utils/mailer');
const bcrypt = require('bcrypt');
// var jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
// to generate token
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');

class UserManager {
  async get(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll() {
    //     return Promise.coroutine(function* () {
    //         try {
    //             let candidates = yield UserModel.find({});
    //             return candidates;
    //         } catch (error) {
    //             console.error(error);
    //             throw error;
    //         }
    //     })();
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async login(email, password) {
    const user = await this.getByEmail(email);
    if (!user) { return { token: null, user: null, message: 'User not found' }; }
    let confirmed = false;
    try { confirmed = await bcrypt.compare(password, user.passwordHash); } catch (err) {}
    if (confirmed) {
      delete user._doc.passwordHash;
      const token = jwt.sign({ email: user.email, roles: user.roles }, SECRET);
      return { token, user };
    }
    return { message: 'Invalid Password' };
  }
  async addUserToCustomer(user, customerId) {
    try {
      const customer = await CustomerModel.findById(customerId);
      customer.users.push(user._id);
      return await customer.save();
    } catch (err) {
      console.log(err)
      return false;
    }
  }
  async create(data, canAssignRole = false) {
    /* Create Customer from Admin or SysAdmin user and send pasword reset email
         * Only if user is **SysAdmin** can set by param the user role! */
    try {
      const object = this;
      var user = await this.getByEmail(data.email);
      if (!user) {
        const newUser = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          passwordHash: '1234'
        };
        // if(process.env.NODE_ENV_SERVER === 'search-test') newUser.passwordHash = data.passwordHash;
        if (canAssignRole) {
          try {
            newUser.roles = JSON.parse(data.roles.replace(/'/g, '"'));
          } catch (e) {
            newUser.roles = data.roles;
          }
        }
        var user = new UserModel(newUser);
        return await user.save().then(function (user) {
          object.sendCreatePasswordMail(user);
          /* Let's associate the user to the customer */
          /* if (data.customerId)
                        object.addUserToCustomer(user, data.customerId) */
          return user;
        });
      }

      return { error: true, message: 'Email already exists' };
    } catch (err) {
      return { error: err, message: 'Problem in backend, please try again later' };
    }
  }
  async sendCreatePasswordMail(user) {
    const token = jwt.sign({ email: user.email }, `${SECRET}resetPass`, { expiresIn: '4h' })
    const frontHost = `${process.env.FRONT_HOST}retrieve-password-step-two?email=${user.email}&token=${token}`;
    sendMail(
      'Create Your New Password At Membrify',
      '<h3>Create Your New Password at Membrify</h3>' +
            'You have enter to this link <a style="background-color: #008CBA;border: none;border-radius: 5px;color: white;padding: 10px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 13px;font-weight: bold;margin: 4px 2px;cursor: pointer;"' +
            `href="${frontHost}">Create New Password</a> to retrieve your password in Membrify.`,
      user.email
    )
  }
  async signUp(data) {
    /* Sign up a user from form */
    try {
      const object = this;
      var user = await this.getByEmail(data.email);
      if (!user) {
        data.passwordHash = data.password;
        var user = new UserModel(data);
        return await user.save().then(function (user) {
          object.sendCreatePasswordMail(user);
          return user;
        });
      }

      return { error: true, message: 'Email already exists', };
    } catch (err) {
      console.log(err)
      return { error: err, message: 'Problem in backend, please try again later' };
    }
  }
  async verifyToken(email, password) {
    const user = await this.getByEmail(email);
    if (!user) { return { token: null, user: null }; }
    const confirmed = await bcrypt.compare(password, user.passwordHash);
    if (confirmed) {
      delete user._doc.passwordHash;
      const token = jwt.sign({ email: user.email, roles: user.roles }, SECRET);
      return { token, user };
    }
    return { message: 'invalid password' };
  }

  async changePassword(user, data) {
    if (!user) { return false; }
    const confirmed = await bcrypt.compare(data.currentPassword, user.passwordHash);
    if (confirmed) {
      user.passwordHash = data.newPassword;
      return await user.save().then(function (user) {
        sendMail(
          'Password Changed Membrify',
          '<h3>Password Reset</h3> You have updated you password successfully in Membrify',
          user.email
        )
        return user;
      });
    }
    return false;
  }
  async resetPasswordStepOne(user) {
    /* at the first step let's send a hash based in the passwordHash
         * this hash will be validated in the step two */
    if (!user) { return false; }
    /* add resetPass as a secret plus only to generate token for reset pass and
         * make it does'n work for authentication */
    const token = jwt.sign({ email: user.email }, `${SECRET}resetPass`, { expiresIn: '4h' })
    const frontHost = `${process.env.FRONT_HOST}retrieve-password-step-two?email=${user.email}&token=${token}`;
    sendMail(
      'Retreive Password Membrify',
      '<h3>Retrive Password</h3>' +
            'You have enter to this link <a style="background-color: #008CBA;border: none;border-radius: 5px;color: white;padding: 10px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 13px;font-weight: bold;margin: 4px 2px;cursor: pointer;"' +
            `href="${frontHost}">Reset Password</a> to retrieve your password in Membrify`,
      user.email
    )
    return true;
  }
  async resetPasswordStepTwo(req, res) {
    /*
         * At the second step let's compare the hash provided by email
         * with the original passwordHash
         * @params: newPassword, token
        */
    if (!req.query.token) { return res.status(400).send({ status: 'ok', message: 'Not token provided' }); }
    if (!req.query.newPassword) { return res.status(400).send({ status: 'ok', message: 'Not newPassword provided' }); }
    let decoded = '';
    try { decoded = jwt.verify(req.query.token, `${SECRET}resetPass`); } catch (error) {
      return res.status(400).send({
        status: 'expired',
        message: 'Token expired',
        error
      });
    }
    if (decoded) {
      const user = await this.getByEmail(decoded.email)
      if (!user) { return res.status(400).send({ status: 'ok', message: 'Invalid Token user, not found', error }); }
      user.passwordHash = req.query.newPassword;
      return await user.save().then(function (user) {
        sendMail(
          'Password Changed',
          '<h3>Password Reset</h3> You have updated you password successfully in Membrify',
          user.email
        )
        delete user._doc.passwordHash;
        const newToken = jwt.sign({ email: user.email, roles: user.roles }, SECRET);
        user.token = newToken;
        return res.status(200).send({
          status: 'ok',
          message: 'Password successfully reseted',
          user,
          token: newToken
        });
      });
    }

    return true;
  }
  async update(data, userId) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        await UserModel.findByIdAndUpdate(userId, data);
        const user = await UserModel.findById(userId);
        return { message: 'User updated Successfully', user }
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //
  // findByEmail(email) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidates = yield UserModel.find({'email': new RegExp(email, 'i')});
  //             return candidates;
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // findByFirstName(name) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidates = yield UserModel.find({'firstName': new RegExp(name, 'i')});
  //             return candidates;
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // findByLastName(lastName) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidates = yield UserModel.find({'lastName': new RegExp(lastName, 'i')});
  //             return candidates;
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // getAll() {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidates = yield UserModel.find({});
  //             return candidates;
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // create(candidate) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let tmp = new UserModel(candidate);
  //             return tmp.save();
  //         } catch (err) {
  //             console.error(err);
  //             throw err;
  //         }
  //     })();
  // }
  //

  //
  // changePassword(id, password) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidate = yield UserModel.update({_id: id}, {$set: {passwordHash: password}});
  //             return candidate;
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // deactivate(id) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidate = yield UserModel.findById(id);
  //             candidate.active = false;
  //             return candidate.save();
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // activate(id) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             let candidate = yield UserModel.findById(id);
  //             candidate.active = true;
  //             return candidate.save();
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
  //
  // delete(id) {
  //     return Promise.coroutine(function* () {
  //         try {
  //             return UserModel.remove({_id: id});
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     })();
  // }
}

// module.exports = new UserManager();
module.exports = new UserManager();
