const Router = require('express');
const quizRouter = require('./quizRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const router = new Router();

router.use('/quiz',quizRouter);
router.use('/report',reportRouter);
router.use('/user',userRouter);
router.use('/role', roleRouter);

module.exports = router;