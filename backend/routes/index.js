const Router = require('express');
const quizRouter = require('./quizRouter');
const reportRouter = require('./reportRouter');
const router = new Router();

router.use('/quiz',quizRouter);
router.use('/report',reportRouter);


module.exports = router;