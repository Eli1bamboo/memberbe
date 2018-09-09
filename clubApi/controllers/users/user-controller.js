const UserManager = require('../../services/user-manager');

const UserModel = require('../../models/user-model');


const AccessControl = require('../../utils/access-control');

class UserController {
  constructor() {
    this.UserModel = UserModel
    this.UserManager = new UserManager()
  }

  async create(req, res) {
    /* Create user from Admin  role
         * email, firstName, lastName, customerId (optional)
         * steps:
         *  1. Create user
         *  2. Send an email to reset the password
         *  3. If customerId @param is filled, add this user to this customer */
    try {
      const canAssignRole = await AccessControl.canAssignRole(req.user);
      if (req.query.customerId === '') delete req.query.customerId
      const user = await UserManager.create(req.query, canAssignRole);
      if (!user._id) { return res.status(200).send({ status: 'unsuccessfull', error: user.error, message: user.message }); }
      delete user._doc.passwordHash;
      res.status(201).send({
        status: 'created',
        user,
      });
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e
      });
    }
  }
  async getUsersList(req, res) {
    /* Get my users list
         * @header: Authorization Bearer token
         */
    try {
      res.status(200).send({
        status: 'ok',
        users: await UserModel.find({}), // {customer: ''+req.query.customerId}
      });
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e,
        message: 'Server Error when fetching users'
      });
    }
  }
  async getUser(req, res) {
    /* Get user from ID
         * @header: Authorization Bearer token
         * @query: sku, description, type, name
         */
    try {
      const um = new UserManager()
      const user = await um.get(req.params.userId);
      if (!user._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'User not found' });
      res.status(200).send({
        status: 'ok',
        user,
      });
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e,
        message: 'user manager error'
      });
    }
  }
  async getCurrentUser(req, res) {
    try {
      const user = await UserManager.getByEmail(req.user.email);
      if (!user._id) { return res.status(200).send({ status: 'unsuccessfull', error: user.error, message: user.message }); }
      delete user._doc.passwordHash;
      res.status(200).send({
        status: 'ok',
        user,
        message: 'Current user info provided successfully'
      });
    } catch (e) {
      throw e;
      res.status(400).send({
        status: 'error',
        error: e,
        message: 'Error Getting The Current User Info'
      });
    }
  }
  async update(req, res) {
    try {
      const um = new UserManager()
      let user = await um.get(req.params.userId);
      if (user) {
        user = await um.update(req.body, req.params.userId)
        
        return res.status(200).send({
          status: 'updated',
          user,
          message: 'User Updated Successfully'
        });
      }
      return res.status(400).send({
        status: 'error',
        user,
        message: 'User not found'
      });
    } catch (e) {
      throw e;
      return res.status(400).send({
        status: 'error',
        error: e,
        message: 'Invalid input'
      });
    }
  }
}

module.exports = UserController
