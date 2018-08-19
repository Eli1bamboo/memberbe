
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({

}, { discriminatorKey: 'kind' })

const UserModel = require('./user-model')

const AdminModel = UserModel.discriminator('Admin', UserSchema)

module.exports = AdminModel
