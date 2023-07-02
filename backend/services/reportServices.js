const { Report } = require('../models/models');

class ReportService {
  async createReport(report) {
    const createdReport = await Report.create(report);
    return createdReport;
  }
  async getReportById(id) {
    const getedReport = await Report.findByPk(id);
    return getedReport;
  }
  async getAllReports() {
    const allReports = await Report.findAll();
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
