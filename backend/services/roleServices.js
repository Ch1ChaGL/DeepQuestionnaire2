const { Role } = require('../models/models');

class RoleService {
  async create(role) {
    const createdRole = await Role.create(role);
    return createdRole;
  }
  async getAll() {
    const roles = await Role.findAll();
    return roles;
  }
  async getOne(id) {
    const role = await Role.findByPk(id);
    return role;
  }
  async delete(id) {
    const deletedRole = await Role.destroy({ where: { RoleId: id } });
    return deletedRole;
  }
}

module.exports = new RoleService();
