const { User } = require('../models/models');

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  async checkEmail(Email = '') {
    const user = await User.findOne({ where: { Email } });
    return user;
  }

  async login() {}
  async check() {}
  async getById(id) {
    const user = await User.findOne({ where: { UserId: id } });
    return user;
  }
  async getUserById(id) {
    const getedUser = await User.findOne({ where: { UserId: id } });
    return getedUser;
  }
  async deleteUserById(id) {
    const deletedUser = await User.destroy({ where: { UserId: id } });
    return deletedUser;
  }
  async updateUser(user) {
    const udpatedUser = await User.update(
      { ...user },
      { where: { UserId: user.UserId } },
    );
    return udpatedUser;
  }
  async getUsers() {
    const getedUsers = await User.findAll({
      attributes: ['UserId', 'RoleId', 'FullName', 'Email'],
    });
    return getedUsers;
  }
  async getUser(id){
    const getedUser = await User.findAll({
      attributes: ['UserId', 'RoleId', 'FullName', 'Email'],
      where: { UserId:id },
    });
    return getedUser;
  }
}

module.exports = new UserService();
