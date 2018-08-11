'use strict';

const ProductManager = require('../../services/product-manager');
const ProductModel = require('../../models/product-model');
class ProductController {
    async create(req, res) {
        /* Create product for customer from Admin  role
         * @header: Authorization Bearer token
         * @query: sku, description, type, name
         */
        try {
            // var customer = await CustomerManager.get(req.query.customerId);
            // if (!customer._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'Customer not found' });
            var product = await ProductManager.create(req.query);
            if (!product._id)
                return res.status(200).send({ status: 'unsuccessfull', error: product.error, message: product.message });
            res.status(201).send({
                status: 'created',
                product: product,
                message: 'Product created successfully'
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Product already exists'
            });

        }
    }
    async getProduct(req, res) {
        /* Create product from Sys Admin  role
         * @header: Authorization Bearer token
         * @query: sku, description, type, name
         */
        try {
            var product = await ProductManager.get(req.params.productId);
            if (!product._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'Product not found' });
            res.status(200).send({
                status: 'ok',
                product: product,
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Product already exists'
            });

        }
    }
    
    async getProductsList(req, res) {
        /* Get my products catalogue list
         * @header: Authorization Bearer token
         */
        try {
            // var customer = await CustomerManager.get(req.query.customerId);
            // if (!customer._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'Customer not found' });
            res.status(200).send({
                status: 'ok',
                products: await ProductModel.find({}), //{customer: ''+req.query.customerId}
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error with Product'
            });
        }
    }
    /*async getCustomerProducts(req, res) {
        /* Get my customer products list
         * @header: Authorization Bearer token
         * @query: customerId
         * /
        try {
            var customer = await CustomerManager.get(req.query.customerId);
            if (!customer._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'Customer not found' });
            res.status(200).send({
                status: 'ok',
                products: await ProductModel.find({customer: ''+req.query.customerId}),
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error with Product'
            });

        }
    }*/
    async update(req, res) {
        /* Update a Product
         * @header: Authorization Bearer token
         * @param in url: productId
         * @query: sku, description, type, name
         */
        try {
            var status = 'updated'
            var product = await ProductManager.update(req.query, req.params.productId)
            if (product.error) status = 'error';
            res.status(200).send({
                status: status,
                error: product.error,
                product: product.product,
                message: product.message
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error with Product'
            });

        }
    }
    async delete(req, res) {
        /* Delete a Product
         * @header: Authorization Bearer token
         * @param in url: productId
         * @query: 
         */
        try {
            var status = 'deleted';
            if (!req.params.productId) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'Product not found' });
            var product = await ProductManager.delete(req.params.productId)
            if (product.error) status = 'error';
            res.status(200).send({
                status: status,
                error: product.error,
                message: product.message
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error with Product'
            });

        }
    }
    
}

module.exports = new ProductController();