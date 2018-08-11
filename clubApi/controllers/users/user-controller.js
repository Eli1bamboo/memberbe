'use strict';

const UserManager = require('../../services/user-manager');
const UserModel = require('../../models/user-model');
const AccessControl = require('../../utils/access-control');

class UserController {
    async create(req, res) {
        /* Create user from Admin  role
         * email, firstName, lastName, customerId (optional)
         * steps:
         *  1. Create user
         *  2. Send an email to reset the password 
         *  3. If customerId @param is filled, add this user to this customer */
        try {
            console.log("PAPAPA");
            const canAssignRole = await AccessControl.canAssignRole(req.user);
            if (req.query.customerId === '') delete req.query.customerId
            var user = await UserManager.create(req.query, canAssignRole);
            if (!user._id)
                return res.status(200).send({ status: 'unsuccessfull', error: user.error, message: user.message });
            delete user._doc.passwordHash;
            res.status(201).send({
                status: 'created',
                user: user,
            });
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: 'error',
                error: e
            });

        }
    }
    async getUsersList(req, res) {
        /* Get my users list
         * @header: Authorization Bearer token
         */
        try {
            res.status(200).send({
                status: 'ok',
                users: await UserModel.find({}), //{customer: ''+req.query.customerId}
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error with Product'
            });

        }
    }
    async getUser(req, res) {
        /* Get user from ID
         * @header: Authorization Bearer token
         * @query: sku, description, type, name
         */
        try {
            var user = await UserManager.get(req.params.userId);
            if (!user._id) return res.status(200).send({ status: 'unsuccessfull', error: null, message: 'User not found' });
            res.status(200).send({
                status: 'ok',
                user: user,
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'User already exists'
            });

        }
    }
    async getCurrentUser(req, res) {
        try {
            var user = await UserManager.getByEmail(req.user.email);
            if (!user._id)
                return res.status(200).send({ status: 'unsuccessfull', error: user.error, message: user.message });
            delete user._doc.passwordHash;
            res.status(200).send({
                status: 'ok',
                user: user,
                message: 'Current user info provided successfully'
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Error Getting The Current User Info'
            });

        }
    }
    async update(req, res) {
        try {
            var user = await UserManager.getByEmail(req.query.email);
            if (user){
                if (req.query.customerId === '') delete req.query.customerId
                var user = await UserManager.update(req.query, req.params.userId)
                var user = await UserManager.getByEmail(req.query.email);
                delete user._doc.passwordHash;
                return res.status(200).send({
                    status: 'updated',
                    user: user,
                    message: 'User Updated Successfully'
                });
            }
            return res.status(400).send({
                status: 'error',
                user: user,
                message: 'User has not access'
            });
        } catch (e) {
            throw e;
            return res.status(400).send({
                status: 'error',
                error: e,
                message: 'Invalid input'
            });
    
        }
      }
}

module.exports = new UserController();