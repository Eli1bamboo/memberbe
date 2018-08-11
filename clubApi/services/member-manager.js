'use strict';

const MemberModel = require('../models/member-model');
const UserModel = require('../models/user-model')
const Promise = require('bluebird');
var bcrypt = require('bcrypt');
// var jwt = require('express-jwt');
const jwt = require('jsonwebtoken'); // to generate token
const ObjectId = require('mongoose').Schema.Types.ObjectId;
const SECRET = Buffer.from(process.env.SHARED_SECRET, 'base64');
const UserManager = require('./user-manager');

class MemberManager {
    async get(id) {
        try {
            return await MemberModel.findById(id).populate('users', 'email firstName lastName active')
            // .exec(function (err, users) {});;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async create(data, user){
        try {
            delete data.users; delete data.admin; delete data.documents;/* => Avoid hack */ 
            data.admin = user._id; /* Set current user as admin */
            var member = new MemberModel(data);
            return await member.save().then(function (member){
                user.memberId = member._id;
                user.save();
                return member;
            });
        } catch (err) {
            // console.log(err)
            return {error: err, message: 'Invalid Member'};
        }
    }
    async update(data, memberId) {
        try {
            delete data.users; delete data.admin; delete data.documents;/* => Avoid hack */ 
            await MemberModel.findByIdAndUpdate(memberId, data);
            return await MemberModel.findById(memberId)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findByAdmin(adminId){
        try {
            return await MemberModel.find({admin: adminId});
        } catch (err) {
            console.log(err)
            return {error: err, message: 'Problems extracting the admin\'s Members'};
        }
    }
    async isAdmin(user, memberId){
        try {
            var member = await MemberModel.findById(memberId);
            if (member) return member.admin.equals(user._id);
            else return false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async isUserOfMember(user, memberId){
        try {
            var member = await MemberModel.findById(memberId);
            if (member)
              return member.users.indexOf(user._id)!==-1 || member.admin.equals(user._id);
            else return false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async addDoc(docId, memberId){
        try{
            // if (!docId || !memberId) return {error: {}, message: 'docId and memberId are required fileds'};
            var member = await MemberModel.findById(memberId);
            member.documents.push(docId);
            return await member.save().then(function (member){
                return member;
            });
        }catch(err){
            console.log(err)
            return {error: err, message: 'Problems Adding the document to the member'};
        }

    }
    async revokeUser(memberId, userId) {
        try{
            var member = await MemberModel.findById(memberId);
            member.users.pull(userId);
            return await member.save().then(async function (member){
                const user = await UserModel.findById(userId);
                // user.memberId = null;
                await user.remove();
                return member;
            });
        }catch(err){
            console.log(err)
            return {error: err, message: 'Problems revoking the user to the member'};
        }
    }
        
}

module.exports = new MemberManager();