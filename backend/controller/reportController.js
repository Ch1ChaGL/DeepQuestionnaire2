const reportService = require('../services/reportServices');
const userService = require('../services/userServices');
const ApiError = require('../error/ApiError');
const exceljs = require('exceljs');

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
      return next(
        ApiError.badRequest(`Не существует отчета по такому id = ${ReportId}`),
      );
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

  static convertIdArrayToObject = idArray => {
    const idObject = {};
    idArray.forEach(id => {
      idObject[id] = false;
    });
    return idObject;
  };
  async getAllReport(req, res, next) {
    const pageSize = 12; // Размер одной страницы
    let getedReports;
    const { searchQuery, sort } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    let totalReports = 0;
    const idsArray = await reportService.getAllAvailableIds();
    const ids = ReportController.convertIdArrayToObject(idsArray);
    if (req.user.RoleId === 2 || req.user.RoleId === 3) {
      getedReports = await reportService.getAllReports(searchQuery, sort);
      totalReports = getedReports.length;
      //return res.json(getedReports);
    } else {
      const userId = req.user.UserId;
      getedReports = await reportService.getAllReportsByUserId(userId);
    }

    if (!getedReports)
      return next(
        ApiError.badRequest('При получении всех отчетов произошла ошибка'),
      );

    if (page) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      getedReports = getedReports.slice(startIndex, endIndex);
      console.log('getedReports', getedReports);
    }

    return res.json({
      total: totalReports,
      Reports: getedReports,
      pageSize: pageSize,
      ids,
    });
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

  async getExcelReport(req, res, next) {
    const getArr = (inform, question, answer) => {
      const outputArr = [];
      for (let i = 0; i < question.length; i++) {
        const row = [];
        if (i === 0) {
          inform.forEach(value => row.push(value));
          row.push(question[i]);
          row.push(answer[i]);
          outputArr.push(row);
          continue;
        }
        inform.forEach(() => row.push(''));
        row.push(question[i]);
        row.push(answer[i]);
        outputArr.push(row);
      }
      return outputArr;
    };
    try {
      // Получение данных из базы данных

      const data = await reportService.getReportByIds(req.body.ids);

      // Создание нового документа Excel
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      // Заголовки столбцов
      const headers = [
        'ReportId',
        'ФИО респондента',
        'Email',
        'Название компании',
        'Должность',
        'Телефонный номер',
        'Время опроса',
        'ФИО сотрудника',
        'Вопрос',
        'Ответ',
      ];

      // Добавление заголовков в таблицу Excel
      worksheet.addRow(headers);

      // Заполнение таблицы Excel данными из базы данных
      data.forEach(item => {
        console.log(item);
        console.log(item.Survey);
        const survey = JSON.parse(item.Survey);
        const questions = Object.keys(survey);
        const answers = Object.values(survey);

        console.log('questions', questions);
        console.log('answers', answers);
        // Заполнение основных полей отчета
        const inf = [
          item.ReportId,
          item.RespondentName,
          item.Email,
          item.CompanyName,
          item.JobTitle,
          item.PhoneNumber,
          item.QuizTime.toLocaleString(),
          item.FullNameEmployee,
        ];
        const rows = getArr(inf, questions, answers);
        rows.forEach((row, index) => {
          const addedRow = worksheet.addRow(row);

          if (index !== rows.length - 1 && index !== 0) return;
          if (index === rows.length - 1) {
            addedRow.eachCell(cell => {
              cell.border = {
                bottom: { style: 'medium' },
              };
            });
          }
          if (index === 0) {
            addedRow.eachCell(cell => {
              cell.border = {
                top: { style: 'medium' },
              };
            });
          }
        });
      });

      // Установка заголовков и типа контента для ответа
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

      // Передача файла Excel в ответе
      await workbook.xlsx.write(res);

      // Завершение ответа
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ReportController();
