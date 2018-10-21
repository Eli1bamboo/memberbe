const MemberManager = require('../services/member-manager');
const AccessControl = require('../utils/access-control');
const MemberController = require('../controllers/members/member-controller');

module.exports = function (app) {
    app.post('/members', AccessControl.isAdminOrSysAdmin, MemberController.create);
    app.put('/members/:memberId', AccessControl.isUser, MemberController.update);
    app.delete('/members/:memberId', AccessControl.isUser, MemberController.delete);
    app.get('/members', AccessControl.isAdminOrSysAdmin, MemberController.myMembers);
    app.get('/members/:memberId', AccessControl.isUser, MemberController.get);
    app.post('/members/:memberId/revoke-user', AccessControl.isUser, MemberController.revokeUserToMember);

    app.post('/members/add-doc/:memberId', AccessControl.isUser, async (req, res) => {
        try {
            const member = await MemberManager.addDoc(req.query.docId, req.params.memberId);
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
    });

};