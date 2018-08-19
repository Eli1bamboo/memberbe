

const UserManager = require('../../services/admin-manager');

class UserController {

  async login(req, res) {
    try {
      const token = await UserManager.login(req.param('email'), req.param('password'))
      res.status(200).send({
        status: 'ok',
        user: token.user,
        token: token.token,
        message: token.message
      });
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e,
        email: req.param('email'),
        password: req.param('password')
      });
    }
  }
  async changePassword(req, res) {
    try {
      const user = await UserManager.getByEmail(req.user.email)
      if (await UserManager.changePassword(user, req.query)) {
        return res.status(200).send({
          status: 'ok',
          user,
          message: 'Password Changed Successfully'
        });
      }
      return res.status(400).send({
        status: 'error',
        error: 'Invalid',
        message: 'Invalid Pasword'
      });
    } catch (e) {
      return res.status(400).send({
        status: 'error',
        error: e,
        message: 'Server Error'
      });
    }
  }
  async retrievePasswordStepOne(req, res) {
    try {
      const user = await this.UserManager.getByEmail(req.query.email)
      if (await UserManager.resetPasswordStepOne(user)) {
        return res.status(200).send({
          status: 'ok',
          message: 'Retrieve password Link sent Successfully'
        });
      }
      return res.status(400).send({
        status: 'error',
        error: 'Invalid',
        message: 'User not found'
      });
    } catch (e) {
      return res.status(400).send({
        status: 'error',
        error: e,
        message: 'Server Error'
      });
    }
  }
  async retrievePasswordStepTwo(req, res) {
    /* this controller also works for create password for first time
         * when user is created and associated to a customer by ADMIN role
         */
    try {
      await UserManager.resetPasswordStepTwo(req, res)
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e,
        message: 'Server Error'
      });
    }
  }
  async signUp(req, res) {
    /*  simple sign up for user */
    try {
      const user = await UserManager.signUp(req.query);
      if (!user._id) { return res.status(200).send({ status: 'unsuccessfull', error: user.error, message: user.message }); }
      delete user._doc.passwordHash;
      const token = await UserManager.login(req.query.email, req.query.password)
      return res.status(201).send({
        status: 'created',
        user,
        token: token.token
      });
    } catch (e) {
      return res.status(400).send({
        status: 'error',
        error: e
      });
    }
  }
}

module.exports = new UserController();
