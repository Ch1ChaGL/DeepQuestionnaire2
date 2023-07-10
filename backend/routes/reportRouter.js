const Router = require('express');
const reportController = require('../controller/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/', authMiddleware, reportController.addReport);

router.get('/', authMiddleware, reportController.getAllReport);
router.get('/:id', authMiddleware, reportController.getOneReport);
router.get('/Excel/Report', authMiddleware, reportController.getExcelReport);


router.put('/',authMiddleware, reportController.updateReport);

router.delete('/:id', authMiddleware, reportController.deleteReport);

module.exports = router;
