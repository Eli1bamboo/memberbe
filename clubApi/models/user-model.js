
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { USER_ROLES, USER } = require('../constants')


const baseUserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator(v) {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v)
      },
      message: '{VALUE} is not a valid email address!'
    },
    index: { unique: true },
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  active: { type: Boolean, default: true },
  company_account: { type: Schema.ObjectId, required: false },
  roles: [{ type: String, enum: USER_ROLES, default: USER }],
  passwordHash: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { discriminatorKey: 'kind' })

baseUserSchema.pre('save', function (next) {
  const user = this
  this.updatedAt = Date.now()
  if (!user.isModified('passwordHash')) return next()
  bcrypt.hash(user.passwordHash, 10, (err, hash) => {
    if (!err) {
      user.passwordHash = hash
      next()
    }
    return next(err)
  })
})
const UserModel = mongoose.model('User', baseUserSchema)

module.exports = UserModel
