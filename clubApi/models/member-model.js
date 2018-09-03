
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MemberSchema = new Schema({
    
}, { discriminatorKey: 'kind' })

const UserModel = require('./user-model')

const MemberModel = UserModel.discriminator('Member', MemberSchema)

module.exports = MemberModel
