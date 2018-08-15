

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({

}, { discriminatorKey: 'kind' })

const BaseUserModel = require('./base-user-model')

const UserModel = BaseUserModel.discriminator('User', UserSchema)

module.exports = UserModel
