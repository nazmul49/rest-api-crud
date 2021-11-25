const express = require('express');
const router = express.Router();
const { createNewUser, getAllUsers, findUserById, updateUserInfo, deleteUserById, login } = require('../controller/user.controller');
const { checkToken } = require('../auth/token.validation');
const { addUserValidator, addUserValidationHandler } = require('../validator/user.validator');

// user routing
router.post('/', checkToken, addUserValidator, addUserValidationHandler, createNewUser);
router.get('/', checkToken, getAllUsers);
router.get('/:id', checkToken, findUserById);
router.patch('/', checkToken, updateUserInfo);
router.delete('/', checkToken, deleteUserById);
router.post('/login', login);

module.exports = router;
