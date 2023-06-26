const { User } = require('../models/models');

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  async checkEmail(Email) {
    const user = await User.findOne({ where: { Email } });
    return user;
  }

  async login() {}
  async check() {}
  async getById(id) {
    const user = await User.findOne({ where: { UserId: id } });
    return user;
  }
  async updateById(id, FirstName, LastName) {
    const user = await User.update(
      { FirstName, LastName },
      {
        where: { UserId: id },
      },
    );
    return user;
  }
}

module.exports = new UserService();
