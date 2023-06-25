const Router = require('express');
const reportController = require('../controller/reportController');
const router = new Router();

router.post('/',reportController.addReport);

router.get('/',reportController.getAllReport);
router.get('/:id',reportController.getOneReport);

router.put('/', reportController.updateReport);

router.delete('/:id',reportController.deleteReport);

module.exports = router;