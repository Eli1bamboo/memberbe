'use strict';

const UserManager = require('../../services/user-manager');

class UserController {
    async login(req, res) {
        try {
            let token = await UserManager.login(req.query.email, req.query.password)
            res.status(200).send({
                status: 'ok',
                user: token.user,
                token: token.token,
                message: token.message
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e
            });

        }
    }
    async changePassword(req, res) {
        try {
            var user = await UserManager.getByEmail(req.user.email)
            if (await UserManager.changePassword(user, req.query))
                return res.status(200).send({
                    status: 'ok',
                    user: user,
                    message: 'Password Changed Successfully'
                });
            else
                return res.status(400).send({
                    status: 'error',
                    error: 'Invalid',
                    message: 'Invalid Pasword'
                });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error'
            });

        }
    }
    async retrievePasswordStepOne(req, res) {
        try {
            var user = await UserManager.getByEmail(req.query.email)
            if (await UserManager.resetPasswordStepOne(user))
                return res.status(200).send({
                    status: 'ok',
                    message: 'Retrieve password Link sent Successfully'
                });
            else
                return res.status(400).send({
                    status: 'error',
                    error: 'Invalid',
                    message: 'User not found'
                });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error'
            });

        }
    }
    async retrievePasswordStepTwo(req, res) {
        /* this controller also works for create password for first time
         * when user is created and associated to a customer by ADMIN role
         */
        try {
            await UserManager.resetPasswordStepTwo(req, res)
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Server Error'
            });
    
        }
    }
    async signUp(req, res) {
        /*  simple sign up for user */
        try {
            var user = await UserManager.signUp(req.query);
            if (!user._id)
                return res.status(200).send({status: 'unsuccessfull', error: user.error, message: user.message});
            delete user._doc.passwordHash;
            let token = await UserManager.login(req.query.email, req.query.password)
            res.status(201).send({
                status: 'created',
                user: user,
                token: token.token
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e
            });
    
        }
    }
}

module.exports = new UserController();