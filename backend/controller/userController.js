const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const userServices = require('../services/userServices');

generateJwtToken = (UserId, Email, RoleId, FullName) => {
  return jwt.sign({ UserId, Email, RoleId, FullName }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { Email, Password, RoleId, FullName } = req.body;
    const senderRoleId = req.user.RoleId;
    if (senderRoleId < RoleId)
      return next(
        ApiError.badRequest(
          'Нельзя создать пользователя, уровень доступа которого выше вашего',
        ),
      );

    if (!Email || !Password || !RoleId || !FullName) {
      return next(ApiError.badRequest('Не все поля заполнены'));
    }

    const candidate = await userServices.checkEmail(Email);
    if (candidate) {
      return next(
        ApiError.badRequest('Пользователь с таким email уже зарегистрирован'),
      );
    }

    const hashPassword = await bcrypt.hash(Password, 5);
    const user = await userServices.create({
      Email,
      Password: hashPassword,
      RoleId,
      FullName,
    });

    const jwtToken = generateJwtToken(
      user.UserId,
      user.Email,
      user.RoleId,
      user.FullName,
    );

    return res.json({ jwtToken });
  }
  async login(req, res, next) {
    const { Email, Password } = req.body;

    const candidate = await userServices.checkEmail(Email);
    if (!candidate) {
      return next(
        ApiError.internal('Пользователь с таким email не существует'),
      );
    }

    const comparePassword = bcrypt.compareSync(Password, candidate.Password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'));
    }

    const jwtToken = generateJwtToken(
      candidate.UserId,
      candidate.Email,
      candidate.RoleId,
      candidate.FullName,
    );

    return res.json({ jwtToken });
  }
  async check(req, res, next) {
    const newData = await userServices.getUserById(req.user.UserId);
    const token = generateJwtToken(
      req.user.UserId,
      newData.Email,
      newData.RoleId,
      newData.FullName,
    );
    return res.json({ token });
  }
  async delete(req, res, next) {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    const senderRoleId = req.user.RoleId;
    if (senderRoleId <= user.RoleId)
      return next(
        ApiError.badRequest(
          'Нельзя удалить пользователя, уровень доступа которого равен или выше вашего',
        ),
      );
    const deleteUser = await userServices.deleteUserById(id);
    return res.json(deleteUser);
  }
  async update(req, res, next) {
    const { UserId, Email, RoleId, FullName } = req.body;
    const getedUser = await userServices.getUserById(UserId);

    const checkEmail = await userServices.checkEmail(Email);

    if (!getedUser)
      return next(ApiError.badRequest('Пользователя не существует'));

    if (req.user.RoleId < RoleId)
      return next(
        ApiError.badRequest(
          'Ваш уровень доступа меньше, чем тот который вы хотите присвоить',
        ),
      );

    if (
      req.user.RoleId <= getedUser.RoleId &&
      req.user.UserId !== getedUser.UserId
    )
      return next(
        ApiError.badRequest(
          'Нельзя редактировать, уровень доступа выше или равен вашему',
        ),
      );

    if (checkEmail && Email !== getedUser.Email)
      return next(
        ApiError.badRequest('Пользователя с таким Email уже существует'),
      );
    const updatedUser = await userServices.updateUser(req.body);
    console.log('updatedUser', updatedUser);
    return res.json(updatedUser);
  }
  async getUsers(req, res, next) {
    const RoleId = req.user.RoleId;
    if (RoleId === 1) return next(ApiError.badRequest('Доступ запрещен'));
    const getedUsers = await userServices.getUsers();
    return res.json(getedUsers);
  }
  async getUser(req, res, next) {
    const RoleId = req.user.RoleId;
    const { id } = req.params;
    if (RoleId === 1) return next(ApiError.badRequest('Доступ запрещен'));
    const getedUser = await userServices.getUser(id);
    return res.json(getedUser);
  }
}

module.exports = new UserController();
