"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {
  ACCOUNT_NAME_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
  ANNUAL_SALES_REVENUE_OPTIONS,
  ANNUAL_VOLUME_UNIT_OPTIONS,
  INDUSTRY_VERTICAL_OPTIONS } = require("../constants")
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
const memberSchema = new Schema({
  admin: {type: Schema.Types.ObjectId, ref: "user", required: true},
  name: { type: String, required: true, unique: true },
  users: [{type: Schema.Types.ObjectId, ref: "user"}],
  documents: [{type: Schema.Types.ObjectId, ref: "document"}], // array of object from SearchManager
  accountName: { type: String, enum: ACCOUNT_NAME_OPTIONS, required: true},
  accountType: { type: String, enum: ACCOUNT_TYPE_OPTIONS, required: true},
  website: { type: String, required: true },
  billingAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  installationAddress: { type: String, required: true },
  annualSalesRevenue: { type: String, enum: ANNUAL_SALES_REVENUE_OPTIONS, required: true },
  annualVolume: { type: Schema.Types.Decimal, required: true },
  annualVolumeUnit: { type: String, enum: ANNUAL_VOLUME_UNIT_OPTIONS, required: true },
  shippingAddress: { type: String, required: true },
  email: { type: String, required: true, trim: true,  lowercase: true, validate: [validateEmail, "Please fill a valid email address"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]},
  accountSource: { type: String, required: true },
  industryVertical: { type: String, enum: INDUSTRY_VERTICAL_OPTIONS, required: true },
  // installationAddress: { type: String, enum: ACCOUNT_NAME_OPTIONS, required: true },
  createdAt: { type: Date, "default": Date.now },
  updatedAt: { type: Date, "default": Date.now }
})

memberSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})
const memberModel = mongoose.model("member", memberSchema)

module.exports = memberModel
