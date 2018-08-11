const UserManager = require('../services/user-manager');
const { ADMIN, SYS_ADMIN, USER } = require('../constants');

class AccessControl {

    async isUser(req, res, next) {
        const user = await UserManager.getByEmail(req.user.email)
        if (user.roles.indexOf(USER) !== -1) {
            next();
        }
        else return res.status(401).send('User does not have access to this endpoint');
    }
    async isAdmin(req, res, next) {
        const user = await UserManager.getByEmail(req.user.email)
        if (user.roles.indexOf(ADMIN) !== -1) {
            next();
        }
        else return res.status(401).send('User does not have access to this endpoint');
    }
    async isSysAdmin(req, res, next) {
        const user = await UserManager.getByEmail(req.user.email)
        if (user.roles.indexOf(SYS_ADMIN) !== -1) {
            next();
        }
        else return res.status(401).send('User does not have access to this endpoint');
    }
    async isAdminOrSysAdmin(req, res, next) {
        const user = await UserManager.getByEmail(req.user.email)
        if (user.roles.indexOf(ADMIN) !== -1 || user.roles.indexOf(SYS_ADMIN) !== -1) {
            next();
        }
        else res.status(401).send('User need to be Admin or SysAdmin to access to this endpoint');
    }
    async canAssignRole(user) {
        if (user.roles.indexOf(SYS_ADMIN) !== -1)
            return true;
        return false;
    }
    async isSysAdmin(req, res, next) {
        const user = await UserManager.getByEmail(req.user.email)
        if (user.roles.indexOf(SYS_ADMIN) !== -1)
            next();
        else return res.status(401).send('User does not have access to this endpoint, user is not Sys Admin');
    }
    /* async isAdminOfCustomer(req, res, next) {
        if (!req.params.customerId) req.params.customerId = req.query.customerId;
        const user = await UserManager.getByEmail(req.user.email);
        if (user.roles.indexOf(SYS_ADMIN) !== -1 && user.roles.indexOf(USER) !== -1) {
            return next();
        }
        if (await CustomerManager.isUserOfCustomer(user, req.params.customerId))
            next();
        else res.status(401).send('User does not have access to this endpoint, user is not admin of the customer');
    }
    async verifyHasAccessTo(req, user) {
        if (req.user.roles.indexOf(SYS_ADMIN) !== -1)
            return true;
        switch (req.query.accessTo) {
            case 'UPLOAD_FILES': // params: customerId
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
            case 'SEARCH_FILES':
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
            case 'READ_DOCS':
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
            case 'DELETE_DOCS':
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
            case 'UPDATE_DOCS':
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
            case 'CREATE_DOCS':
                return await CustomerManager.isUserOfCustomer(user, req.query.customerId);
                break;
        }
        return false;
    } */
}
module.exports = new AccessControl();


