const Router = require('express');
const quizController = require('../controller/quizController');

const router = new Router();

router.post('/',quizController.addQuiz);

router.get('/',quizController.getAllQuiz);
router.get('/:id',quizController.getOneQuiz)

router.put('/', quizController.updateOneQuiz);

router.delete('/:id',quizController.deleteQuiz);

module.exports = router;