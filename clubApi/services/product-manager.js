'use strict';

const ProductModel = require('../models/product-model');
const UserModel = require('../models/user-model')
const Promise = require('bluebird');
var bcrypt = require('bcrypt');
// var jwt = require('express-jwt');
const jwt = require('jsonwebtoken'); // to generate token
// const ObjectId = require('mongoose').Schema.Types.ObjectId;
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const UserManager = require('./user-manager');
const DIGIT_NUMBER = 6;
class ProductManager {
    async get(id, userEmail=null) {
        try {
            var product = await ProductModel.findById(id);
            // var user = await UserManager.getByEmail(userEmail)
            // if(product.customer.admin.equals(user._id));
            return product;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async getLastSku() {
        return await ProductModel.findOne({}).sort({ createdAt: -1 })
    }
    async create(data) {
        try {
            // data.customer = customer._id;
            // return this.getLastSku().then(async (product) => {
            //     if (!product) data.sku = (new Array(DIGIT_NUMBER).join('0') + 1).substr(-DIGIT_NUMBER);
            //     else data.sku = (new Array(DIGIT_NUMBER).join('0') + (parseInt(product.sku) + 1)).substr(-DIGIT_NUMBER);
                if (await ProductModel.findOne({sku:data.sku}))
                    return { error: {field: 'sku'}, message: 'Product sku already exists'};
                if (await ProductModel.findOne({name:data.name}))
                    return { error: {field: 'name'}, message: 'Product name already exists'};
                var product = new ProductModel(data);
                return await product.save();
            // })
        } catch (err) {
            return { error: err, message: 'Invalid Product' };
        }
    }
    async delete(productId){
        try {
            var product = await await ProductModel.findById(productId);
            if(!product) return {error: {message: 'ProductId not found'}, message: 'Product not found'}
            // if (product.customer.equals(customerId)){
            await product.remove();
            return {message: 'Product successfully deleted'}
            // }else return {message: 'Product is not of this Customer', error: {"error": 'customerId and productId does not belong'}}
        } catch (error) {
            console.error(error);
            return {error: error, message: 'Product not found'};
        }
    }
    async update(data, productId) {
        try {
            delete data.customer;// delete data.sku; /* Avoid to change the customerId and sku */
            await ProductModel.findByIdAndUpdate(productId, data);
            let product = await ProductModel.findById(productId);
            return {message: 'Product Updated Successfully', product: product}
        } catch (error) {
            console.log("error")
            console.error(error);
            return {error: error, message: 'Product not found'}
        }
    }
    async findByAdmin(adminId) {
        try {
            return await ProductModel.find({ admin: adminId });
        } catch (err) {
            console.log(err)
            return { error: err, message: 'Problems extracting the admin\'s products' };
        }
    }


}

module.exports = new ProductManager();