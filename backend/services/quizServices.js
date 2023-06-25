const { Quiz } = require('../models/models');

class QuizServices {
  async createQuiz(quiz) {
    const createdQuiz = await Quiz.create(quiz);
    return createdQuiz;
  }
  async getQuizById(id) {
    const getedQuiz = await Quiz.findByPk(id);
    return getedQuiz;
  }
  async getAllQuiz() {
    const getedQuizzes = await Quiz.findAll();
    return getedQuizzes;
  }
  async deleteQuizById(QuizId) {
    const deleteedQuiz = await Quiz.destroy({ where: { QuizId } });
    return deleteedQuiz;
  }
  async updateQuiz(quiz) {
    const updatedReport = await Quiz.update(quiz, {
      where: { QuizId: quiz['QuizId'] },
    });
    return updatedReport;
  }
}

module.exports = new QuizServices();
