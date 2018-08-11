/* 
 * created by: @andresdicamillo
 * mailto:pablo.donaire@membrify.com
 */
const UserModel = require('../../models/user-model.js');

class UserFactory {
  removeAll(){
    return UserModel.remove({});
  }
  create(data={}) {
    const n = Math.random() * (10 - 1) + 1;
    var newUser = {
      email: `pablo.${n}@gmail.com`,
      firstName: `Andres ${n}`,
      lastName: ` ${n}`,
      passwordHash: '1234'
    };
    newUser = Object.assign({}, newUser, data);
    var user = new UserModel(newUser);
    return user.save();
  }
}
module.exports = new UserFactory();