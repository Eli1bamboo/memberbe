
const Router = require('express').Router
const router = new Router()
const Um = require('../services/user-manager');
const UserManager = new Um()
const AuthenticationController = require('../controllers/users/authentication');
const Authentication = new AuthenticationController()
const Uc = require('../controllers/users/user-controller');
const UserController = new Uc()
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const AccessControl = require('../utils/access-control');
const { SYS_ADMIN } = require('../constants');
module.exports = function (app) {
  app.post('/users/create', UserController.create);
  app.get('/users/current', UserController.getCurrentUser);
  app.get('/users', UserController.getUsersList)
  app.get('/users/:userId', UserController.getUser);
  app.post('/users/login', Authentication.login);
  app.post('/users/change-password', Authentication.changePassword);
  app.post('/users/retrieve-password-step-one', Authentication.retrievePasswordStepOne)
  app.post('/users/retrieve-password-step-two', Authentication.retrievePasswordStepTwo)
  app.put('/users', UserController.update)
  app.put('/users/:userId', UserController.update);
  // app.post('/users/signup', Authentication.signUp);
  
  app.get('/users-initial-setup', async (req, res) => {
    /* Create a user with the System admin role */
    try {
      var data = {
        email: process.env.SYS_ADMIN_EMAIL,
        firstName: process.env.SYS_ADMIN_FIRST_NAME,
        lastName: process.env.SYS_ADMIN_LAST_NAME,
        passwordHash: process.env.SYS_ADMIN_PASSWORD,
        roles: SYS_ADMIN };
      if (process.env.NODE_ENV === 'test')
        data.passwordHash = '1234';
      var user = await UserManager.create(data, true);
      if (user._id)
        return res.status(200).send({status: 'created', message: 'User Created successfully, review your email'});
      else return res.status(200).send({status: 'unsuccessfull', error: user.error, message: user.error});
    } catch (e) {
      res.status(400).send({
          status: 'error',
          error: e
      });
    }
  });
  
};
// router.route('/validate-token')
//   .get(controller.loginRequired, (...args) => controller.validateToken(...args))
// module.exports = router