const db = require('../config/db.config');
const Role = require('../config/role');
const { hashSync, genSaltSync } = require('bcrypt');

const register = async (data) => {
    // create new User object
    const user = new db.User(data);

    // first registered user will be admin user
    const isFirstUser = (await db.User.count()) === 0;
    user.role = isFirstUser ? Role.Admin : Role.User;

    // hash password
    user.password = getHash(data.password);

    // save User
    await user.save();
}

const getAll = async () => {
    const users = await db.User.findAll();
    return users;
}

const getById = async (id) => {
    const user = await getUser(id);
    return user;
}

const _delete = async (id) => {
    const user = await getUser(id);
    if (user) {
        await user.destroy();
    }
}

const update = async (id, data) => {
    const user = await getUser(id);

    // setting updated time
    data.updated = new Date(Date.now());

    Object.assign(user, data);
    await user.save();

    return user;
}


// helper functions

const getHash = (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

const getUser = async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw "User not found";
    }
    return user;
}


module.exports = {
    register,
    getAll,
    getById,
    _delete,
    update
}

