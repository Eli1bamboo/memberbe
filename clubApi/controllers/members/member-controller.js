'use strict';

const UserManager = require('../../services/user-manager');
const MemberManager = require('../../services/member-manager');

class MemberController {
    async create(req, res) {
        try {
            var user = await UserManager.getByEmail(req.user.email)
            var member = await MemberManager.create(req.query, user);
            if (!member._id)
                return res.status(200).send({ status: 'unsuccessfull', error: member.error, message: member.message });
            res.status(201).send({
                status: 'created',
                member: member
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e
            });

        }
    }
    async update(req, res) {
        try {
            var member = await MemberManager.update(req.query, req.params.memberId);
            if (member._id)
                return res.status(200).send({ status: 'updated', member: member });
            return res.status(400).send({
                status: 'error',
                error: 'Error in Member',
                message: 'Error Updating the Member'
            });
        } catch (e) {
            return res.status(400).send({
                status: 'error',
                error: e,
                message: 'Invalid Input'
            });

        }
    }

    async delete(req, res) {
        try {
            var member = await MemberManager.get(req.params.memberId);
            await member.remove();
            res.status(200).send({
                status: 'deleted',
                members: {}
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e
            });
        }
    }

    async get(req, res) {
        try {
            var member = await MemberManager.get(req.params.memberId);
            res.status(200).send({
                status: 'ok',
                member: member
            });
        } catch (e) {
            throw e;
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Error in server'
            });
        }
    }

    async myMembers(req, res) {
        try {
            var user = await UserManager.getByEmail(req.user.email)
            var members = await MemberManager.findByAdmin(user._id);
            if (!members)
                return res.status(200).send({ status: 'unsuccessfull', error: members.error, message: members.message });
            res.status(200).send({
                status: 'ok',
                members: members
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Error in server'
            });
        }
    }

    async revokeUserToMember(req, res) {
        try {
            var member = await MemberManager.revokeUser(req.params.memberId, req.query.userId);
            if (!member._id)
                return res.status(200).send({ status: 'unsuccessfull', error: members.error, message: members.message });
            res.status(200).send({
                status: 'ok',
                member: await MemberManager.get(req.params.memberId)
            });
        } catch (e) {
            res.status(400).send({
                status: 'error',
                error: e,
                message: 'Error in server'
            });
        }
    }
}

module.exports = new MemberController();
