const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Quiz = sequelize.define('Quiz', {
  QuizId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, primaryKey: true, unique: true },
  Survey: { type: DataTypes.TEXT('long') },
});

const Report = sequelize.define('Report', {
  ReportId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  RespondentName: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING },
  CompanyName: { type: DataTypes.STRING },
  JobTitle: { type: DataTypes.STRING },
  PhoneNumber: { type: DataTypes.STRING },
  QuizTime: { type: DataTypes.DATE },
  Survey: { type: DataTypes.TEXT },
  UserId: { type: DataTypes.INTEGER, allowNull: true },
  FullNameEmployee: { type: DataTypes.STRING },
});

const User = sequelize.define('User', {
  UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FullName: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING, unique: true },
  Password: { type: DataTypes.STRING },
  RoleId: { type: DataTypes.INTEGER },
});

const Role = sequelize.define('Role', {
  RoleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, unique: true },
  Description: { type: DataTypes.STRING },
});

//Установка связи между таблицами Role и User
Role.hasMany(User, { foreignKey: 'RoleId' });
User.belongsTo(Role, { foreignKey: 'RoleId' });

//Установка связи между таблицами Report и User
Report.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Report, { foreignKey: 'UserId', onDelete: 'SET NULL' });

module.exports = {
  Quiz,
  Report,
  Role,
  User,
};
