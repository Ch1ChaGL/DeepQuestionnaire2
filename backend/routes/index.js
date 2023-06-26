const Router = require('express');
const quizRouter = require('./quizRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');
const router = new Router();

router.use('/quiz',quizRouter);
router.use('/report',reportRouter);
router.use('/user',userRouter);

module.exports = router;