const { check, validationResult } = require('express-validator');
const { getUserByEmail } = require('../service/user.service');

const addUserValidator = [
    check('first_name')
        .isLength({ min: 1 })
        .withMessage('First Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('First name must contain anything other than aphabet')
        .trim(),
    check('last_name')
        .isLength({ min: 1 })
        .withMessage('Last Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Last name must contain anything other than aphabet')
        .trim(),
    check('gender')
        .isLength({ min: 1 })
        .withMessage('Gender is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Gender only contains alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            await getUserByEmail(value, (err, results) => {
                if (err) {
                    console.log(err);
                }

                console.log('in validation: ', results);
                if (results) {
                    throw Error("Email is already in use!");
                }
            })
        })
        .withMessage("Email is already in use!")
];

const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: 0,
            message: "add user failed",
            data: errors.array()
        });
    }
    next();
}

module.exports = {
    addUserValidator,
    addUserValidationHandler
}
