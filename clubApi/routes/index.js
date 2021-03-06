const jwt = require('express-jwt');
const healthCheckRoutes = require('./health-check');
const productRoutes = require('./product-routes');
const memberRoutes = require('./member-routes');
const user = require('./user-routes');
const admin = require('./admin-routes');
const Um = require('../services/user-manager');
const AccessControl = require('../utils/access-control');

const UserManager = new Um()

const unlessPaths = ['/users/signup', '/users-initial-setup', '/admins-initial-setup',
  '/health', '/alive', '/users/login', '/admins/login',
  '/users/retrieve-password-step-one', '/users/retrieve-password-step-two']

module.exports = function (app) {
  app.use(jwt({ secret: Buffer.from(process.env.SHARED_SECRET, 'base64') })
    .unless({ path: unlessPaths }));

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid token user api...');
    }
  });

  app.get(
    '/verify', jwt({ secret: Buffer.from(process.env.SHARED_SECRET, 'base64') }),
    async function (req, res) {
      const user = await UserManager.getByEmail(req.user.email)
      delete user._doc.passwordHash;
      if (await AccessControl.verifyHasAccessTo(req, user)) { return res.status(200).send({ access: true, user }); }
      res.sendStatus(401);
    }
  );
  user(app);
  admin(app);
  productRoutes(app);
  memberRoutes(app);
  healthCheckRoutes(app);
};
