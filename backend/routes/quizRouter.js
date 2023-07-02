const Router = require('express');
const quizController = require('../controller/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/', authMiddleware, quizController.addQuiz);

router.get('/', authMiddleware, quizController.getAllQuiz);
router.get('/:id', authMiddleware, quizController.getOneQuiz);

router.put('/', authMiddleware, quizController.updateOneQuiz);

router.delete('/:id', authMiddleware, quizController.deleteQuiz);

module.exports = router;
