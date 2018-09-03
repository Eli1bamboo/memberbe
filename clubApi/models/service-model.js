/*
 * Created by @andresdicamillo
 * Service mode for differtens kind of services that paclab could offer
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerMode = require('./customer-model');

var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const servieSchema = new Schema({
    name: {type: String, required: true},
    customer: {type: Schema.Types.ObjectId, ref: 'customer', required: true},

    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
});

servieSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
const productModel = mongoose.model('service', servieSchema);

module.exports = productModel;