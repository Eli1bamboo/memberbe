'use strict';
/*
 * Product or catalogue Model
 * of different product paclab has in the list
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { PRODUCT_TYPE_OPTIONS } = require('../constants');
const productSchema = new Schema({
    sku: {type: String, unique: true, required: true},
    // stock: {type: Number, 'default': 0, required: true},
    productType: { type: String, required: true},
    type: { type: String, enum: PRODUCT_TYPE_OPTIONS, required: true},
    name: { type: String, unique: true, required: true},
    description: {type: String},
    
    // services: {type: Schema.Types.ObjectId, ref: 'customer', required: true},

    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
});

productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
const productModel = mongoose.model('product', productSchema);

module.exports = productModel;