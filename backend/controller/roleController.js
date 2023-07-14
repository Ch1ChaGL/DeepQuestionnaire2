const ApiError = require('../error/ApiError');
const { Role } =require('../models/models');
class RoleController {

 async getRoles(req, res, next) {
    if(req.user.RoleId < 2) return next(ApiError.badRequest('Недостаточно прав'));
    const getedRoles = await Role.findAll();
    return res.json(getedRoles);
 }
}
module.exports = new RoleController();