const router = require('express').Router();
const { registerUser, getAllUsers, getUserById, deleteUserById, updateUserInfo } = require('../controllers/user.controller');
const { checkToken } = require('../auth/token.validation');
const { addUserValidator, addUserValidationHandler } = require('../validators/user.validator');

// user routing
// router.post('/', checkToken, addUserValidator, addUserValidationHandler, createNewUser);
// router.get('/', checkToken, getAllUsers);
// router.get('/:id', checkToken, findUserById);
// router.patch('/', checkToken, updateUserInfo);
// router.delete('/', checkToken, deleteUserById);
// router.post('/login', login);

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserInfo);


module.exports = router;
