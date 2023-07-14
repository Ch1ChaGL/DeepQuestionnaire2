const Router = require('express');
const roleController = require('../controller/roleController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();


router.get('/', authMiddleware, roleController.getRoles);


module.exports = router;
