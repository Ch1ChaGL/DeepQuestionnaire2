const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userServices');
const { User } = require('../models/models');

generateJwtToken = (UserId, Email, RoleId, FullName) => {
  return jwt.sign({ UserId, Email, RoleId, FullName }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { Email, Password, RoleId, FullName } = req.body;

    if (!Email || !Password || !RoleId || !FullName) {
      return next(ApiError.badRequest('Не все поля заполнены'));
    }

    const candidate = await userService.checkEmail(Email);
    if (candidate) {
      return next(
        ApiError.badRequest('Пользователь с таким email уже зарегистрирован'),
      );
    }

    const hashPassword = await bcrypt.hash(Password, 5);
    const user = await userService.create({
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

    const candidate = await userService.checkEmail(Email);
    if (!candidate) {
      return next(
        ApiError.internal('Пользователь с таким email не существует'),
      );
    }

    const comparePassword = await bcrypt.compareSync(
      Password,
      candidate.Password,
    );

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
    const token = generateJwtToken(
      req.user.UserId,
      req.user.Email,
      req.user.RoleId,
      req.user.FullName,
    );
    return res.json({ token });
  }
}

module.exports = new UserController();
