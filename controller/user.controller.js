const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByEmail
} = require('../service/user.service');

const createNewUser = (req, res) => {
    // console.log("request: ", req.body);
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "User creation failed"
            });
        }
        return res.status(201).json({
            success: 1,
            data: results
        })
    })
}

const findUserById = (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                success: 1,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

const getAllUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                success: 0,
                message: "no user found"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

const updateUserInfo = (req, res) => {
    console.log("request: ", req.body);
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "User update failed"
            });
        }
        return res.status(201).json({
            success: 1,
            message: 'user updated successfully'
        })
    })
}

const deleteUserById = (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                success: 0,
                message: "user delete failed"
            });
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "record not found"
            });
        }
        return res.status(200).json({
            success: 1,
            data: "user delete successful"
        });
    });
}

const login = (req, res) => {
    // console.log(req.body);
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
        }

        if (!results) {
            return res.json({
                success: 0,
                data: "invalid email or password"
            });
        }

        const restult = compareSync(body.password, results.password);

        if (restult) {
            results.password = undefined;
            const jsontoken = sign({ restult: results }, process.env.JWT_KEY, {
                expiresIn: '1h'
            });

            return res.json({
                success: 1,
                message: 'login successfully',
                token: jsontoken
            });
        } else {
            return res.json({
                success: 0,
                data: 'invalid user or password'
            });
        }
    })
}

module.exports = {
    createNewUser,
    findUserById,
    getAllUsers,
    updateUserInfo,
    deleteUserById,
    login
}
