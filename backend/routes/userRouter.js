const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controller/userController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
router.post('/registration', authMiddleware, userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/', authMiddleware, userController.getUsers);
router.get('/:id', authMiddleware, userController.getUser)
router.delete('/:id', authMiddleware, userController.delete);
router.put('/', authMiddleware, userController.update);
module.exports = router;
