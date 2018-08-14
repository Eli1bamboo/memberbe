
const Router = require('express').Router
const router = new Router()
const AccessControl = require('../utils/access-control');
const ProductController = require('../controllers/products/product-controller');

module.exports = function (app) {
  app.post('/products', AccessControl.isSysAdmin, ProductController.create);
  app.get('/products', AccessControl.isSysAdmin, ProductController.getProductsList);
  app.get('/products/:productId', ProductController.getProduct);
  app.put('/products/:productId', AccessControl.isSysAdmin, ProductController.update);
  app.delete('/products/:productId', AccessControl.isSysAdmin, ProductController.delete);
};
