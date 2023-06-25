const reportService = require('../services/reportServices');
const ApiError = require('../error/ApiError');
class ReportController {
  /**
   * !Что имеет больший приоритет, при отсутствии чего нельзя создать отчет ???
   */
  async addReport(req, res, next) {
    const { Survey } = req.body;

    const stringSurvey = JSON.stringify(Survey);
    const reqBody = req.body;

    const createdReport = await reportService.createReport({
      ...reqBody,
      Survey: stringSurvey,
    });

    if (!createdReport)
      next(ApiError.badRequest('При добавлении отчета произошла ошибка'));
    return res.json(createdReport);
  }

  async updateReport(req, res, next) {
    const { ReportId, Survey } = req.body;

    const isAlive = await reportService.getReportById(ReportId);
    if (!isAlive) {
      return next(ApiError.badRequest(`Не существует отчета по такому id = ${ReportId}`));
    }

    const stringSurvey = JSON.stringify(Survey);
    const reqBody = req.body;

    const updatedReport = await reportService.updateReport({
      ...reqBody,
      Survey: stringSurvey,
    });

    if (!updatedReport)
      next(ApiError.badRequest('При обновлении отчета произошла ошибка'));
    return res.json(updatedReport);
  }

  async getAllReport(req, res, next) {
    const getedReports = await reportService.getAllReports();
    if (!getedReports)
      return next(
        ApiError.badRequest('При получении всех отчетов произошла ошибка'),
      );
    return res.json(getedReports);
  }
  async getOneReport(req, res, next) {
    const { id } = req.params;
    const getedReport = await reportService.getReportById(id);
    if (!getedReport)
      return next(
        ApiError.badRequest(
          `Запрашиваемого отчета по id = ${id} не существует`,
        ),
      );
    return res.json(getedReport);
  }
  async deleteReport(req, res, next) {
    const { id } = req.params;

    const isAlive = await reportService.getReportById(id);
    if (!isAlive)
      return next(ApiError.badRequest('Отчета по такому id не существует'));

    const deletedReport = await reportService.deleteReport(id);
    if (!deletedReport)
      return next(ApiError.badRequest('При удалении произошла ошибка'));

    return res.json(deletedReport);
  }
}

module.exports = new ReportController();
