const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Quiz = sequelize.define('Quiz', {
  QuizId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, primaryKey: true },
  Survey: { type: DataTypes.TEXT, primaryKey: true },
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
});

module.exports = {
  Quiz,
  Report,
};
