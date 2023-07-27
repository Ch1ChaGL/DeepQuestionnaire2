const ApiError = require('../error/ApiError');
const quizServices = require('../services/quizServices');

class QuizController {
  async addQuiz(req, res, next) {
    try {
      const { Survey } = req.body;
      const stringSurvey = JSON.stringify(Survey);

      const reqBody = req.body;

      const createdQuiz = await quizServices.createQuiz({
        ...reqBody,
        Survey: stringSurvey,
      });
      return res.json(createdQuiz);
    } catch (e) {
      return next(e);
    }
  }
  async getAllQuiz(req, res, next) {
    const getedQuizzes = await quizServices.getAllQuiz();
    if (!getedQuizzes)
      return next(
        ApiError.badRequest('Поиск по всем опросам не дал результатов'),
      );
    return res.json(getedQuizzes);
  }
  async getOneQuiz(req, res, next) {
    const { id } = req.params;

    console.log('id', id);
    const getedQuiz = await quizServices.getQuizById(id);

    if (!getedQuiz)
      return next(ApiError.badRequest('Опроса с таким id не существует'));

    return res.json(getedQuiz);
  }
  async deleteQuiz(req, res, next) {
    const { id } = req.params;
    const isAlive = await quizServices.getQuizById(id);
    if (!isAlive)
      return next(ApiError.badRequest('Опроса с таким id не существует'));

    const deletedQuiz = await quizServices.deleteQuizById(id);
    if (!deletedQuiz) return next(ApiError.badRequest('Ошибка при удалении'));

    return res.json(deletedQuiz);
  }
  async updateOneQuiz(req, res, next) {
    const { QuizId, Survey } = req.body;

    const isAlive = await quizServices.getQuizById(QuizId);
    if (!isAlive)
      return next(
        ApiError.badRequest(`Не существует такого опроса с id = ${QuizId}`),
      );

    const stringSurvey = JSON.stringify(Survey);
    const reqBody = req.body;

    const updatedQuiz = await quizServices.updateQuiz({
      ...reqBody,
      Survey: stringSurvey,
    });
    if (!updatedQuiz)
      return next(
        ApiError.badRequest('При обновлении опроса произошла ошибка'),
      );

    return res.json(updatedQuiz);
  }
}

module.exports = new QuizController();
