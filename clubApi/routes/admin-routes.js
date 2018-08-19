
const Router = require('express').Router
const router = new Router()
const UserManager = require('../services/user-manager');
const Authentication = require('../controllers/admins/authentication');
const UserController = require('../controllers/admins/user-controller');
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const AccessControl = require('../utils/access-control');
const { SYS_ADMIN } = require('../constants');
module.exports = function (app) {
  app.post('/admins/create', AccessControl.isAdminOrSysAdmin, UserController.create);
  app.get('/admins/current', UserController.getCurrentUser);
  app.get('/admins', UserController.getUsersList)
  app.get('/admins/:userId', UserController.getUser);
  app.post('/admins/login', Authentication.login);
  app.post('/admins/change-password', Authentication.changePassword);
  app.post('/admins/retrieve-password-step-one', Authentication.retrievePasswordStepOne)
  app.post('/admins/retrieve-password-step-two', Authentication.retrievePasswordStepTwo)
  app.put('/admins', UserController.update)
  app.put('/admins/:userId', UserController.update);
  // app.post('/admins/signup', Authentication.signUp);
  
  app.get('/admins-initial-setup', async (req, res) => {
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