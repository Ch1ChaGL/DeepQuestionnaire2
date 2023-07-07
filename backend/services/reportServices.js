const { Report } = require('../models/models');
const { Op, Sequelize } = require('sequelize');

class ReportService {
  async createReport(report) {
    const createdReport = await Report.create(report);
    return createdReport;
  }
  async getReportById(id) {
    const getedReport = await Report.findByPk(id);
    return getedReport;
  }
  async getAllReports(searchQuery = null, sort = 'newReports') {
    let orderOption = [];
    console.log('searchQuery', searchQuery);
    console.log(sort);
    if (sort === 'newReports') {
      orderOption = [['QuizTime', 'DESC']]; // Сортировка по полю QuizTime в порядке убывания
    } else if (sort === 'oldReports') {
      orderOption = [['QuizTime', 'ASC']]; // Сортировка по полю QuizTime в порядке возрастания
    }

    let queryOptions = {};

    const modelColumns = Object.keys(Report.getAttributes());

    console.log('modelColumns', modelColumns);
    if (searchQuery) {
      // Если есть поисковый запрос, добавляем соответствующие условия в запрос
      const excludedColumns = [
        'createdAt',
        'updatedAt',
        'QuizTime',
        'ReportId',
        'UserId',
      ];

      const searchConditions = modelColumns
        .filter(column => !excludedColumns.includes(column))
        .map(column => ({
          [column]: { [Op.iLike]: `%${searchQuery}%` },
        }));

      searchConditions.push({
        [Op.or]: [
          Sequelize.where(
            Sequelize.cast(Sequelize.col('ReportId'), 'varchar'),
            'LIKE',
            `%${searchQuery}%`,
          ),
        ],
      });

      queryOptions = {
        where: {
          [Op.or]: searchConditions,
        },
        order: orderOption,
      };
    } else {
      // Если поисковый запрос пустой, просто применяем сортировку
      queryOptions = {
        order: orderOption,
      };
    }

    const allReports = await Report.findAll(queryOptions);
    return allReports;
  }
  async getAllReportsByUserId(UserId) {
    const allReports = await Report.findAll({ where: { UserId } });
    return allReports;
  }
  async deleteReport(id) {
    const deletedReport = await Report.destroy({ where: { ReportId: id } });
    return deletedReport;
  }
  async updateReport(report) {
    const updatedReport = await Report.update(report, {
      where: { ReportId: report['ReportId'] },
    });
    return updatedReport;
  }
}

module.exports = new ReportService();
