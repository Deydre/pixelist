const express = require('express');
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');

const userController = require("../controllers/user.controller");
const router = express.Router();
const {userDataValidateChainMethod} = require('../validation/user.validation');


router.post('/signup', userDataValidateChainMethod, userController.createUser);
router.post('/login', userDataValidateChainMethod, userController.login);
router.get('/logout', userController.logout);
router.get('/', userController.getAllUsers);
router.get('/me', getAccessToken, decodeToken, userController.getUserByEmail);
router.put('/email',userController.updateUserByEmail);
router.delete('/email', userController.deleteUserByEmail);

module.exports = router;