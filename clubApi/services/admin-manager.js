

const AdminModel = require('../models/admin-model')
const UserManager = require('./user-manager')

class AdminManager extends UserManager {

  async create(data, canAssignRole = false) {
    /* Create Customer from Admin or SysAdmin user and send pasword reset email
         * Only if user is **SysAdmin** can set by param the user role! */
    try {
      const object = this;
      const user = await super.getByEmail(data.email);
      if (!user) {
        const newUser = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          passwordHash: '1234'
        };
        // if(process.env.NODE_ENV_SERVER === 'search-test') newUser.passwordHash = data.passwordHash;
        if (canAssignRole) {
          try {
            newUser.roles = JSON.parse(data.roles.replace(/'/g, '"'));
          } catch (e) {
            newUser.roles = data.roles;
          }
        }
        const admin = new AdminModel(newUser);
        return await admin.save().then(function (admin) {
          object.sendCreatePasswordMail(admin);
          /* Let's associate the user to the customer */
          /* if (data.customerId)
                        object.addUserToCustomer(user, data.customerId) */
          return admin;
        });
      }

      return { error: true, message: 'Email already exists' };
    } catch (err) {
      return { error: err, message: 'Problem in backend, please try again later' };
    }
  }

}

// module.exports = new UserManager();
module.exports = AdminManager
