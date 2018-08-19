

const Am = require('../../services/admin-manager');

const AdminManager = new Am()

const AuthenticationController = require('../users/authentication')

class AdminAuthenticationController extends AuthenticationController {
  async login(req, res) {
    try {
      const token = await AdminManager.login(req.param('email'), req.param('password'))
      res.status(200).send({
        status: 'ok',
        user: token.user,
        token: token.token,
        message: token.message
      });
    } catch (e) {
      res.status(400).send({
        status: 'error',
        error: e
      });
    }
  }
}

module.exports = new AdminAuthenticationController();
