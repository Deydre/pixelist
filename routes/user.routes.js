const express = require('express');
// Rutas de usuario
const userController = require("../controllers/user.controller");
const router = express.Router();
// const {userDataValidateChainMethod} = require('../validation/user.validation');


router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/', userController.getAllUsers);
router.get('/email',userController.getUserByEmail);
router.put('/email',userController.updateUserByEmail);
router.delete('/email', userController.deleteUserByEmail);

module.exports = router;