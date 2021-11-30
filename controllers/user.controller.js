const userService = require('../services/user.service');

const registerUser = (req, res) => {
    userService.register(req.body)
        .then(() => res.status(201).json({ message: 'User registration successful' }))
        .catch(err => {
            res.json({
                message: 'User registration failed.',
                data: err.message
            })
        });
}

const getAllUsers = (req, res) => {
    userService.getAll()
        .then(users => res.json({ data: users }))
        .catch(err =>
            res.json({
                message: "user retrival failed."
            })
        );
}

const getUserById = (req, res) => {
    userService.getById(req.params.id)
        .then(user => res.json({ data: user }))
        .catch(err => res.status(404).json({ message: err }));
}

const deleteUserById = (req, res) => {
    userService._delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(404).json({ message: err }));
}

const updateUserInfo = (req, res) => {
    userService.update(req.params.id, req.body)
        .then(user => res.json({ data: user }))
        .catch(err => res.status(404).json({ message: err }));
}

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserInfo
}