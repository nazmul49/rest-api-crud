const connection = require('../config/db.config');


const create = (data, callback) => {
    // console.log("data in service: ", data);
    const queryString = `insert into user(first_name, last_name, gender, email, password, number) values(?,?,?,?,?,?)`;
    connection.query(
        queryString,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
}

const getUsers = (callback) => {
    const queryString = `select id, first_name, last_name, gender, email, number from user`;
    connection.query(
        queryString,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

const getUserById = (id, callback) => {
    const queryString = `select id, first_name, last_name, gender, email, number from user where id = ?`;
    connection.query(
        queryString,
        [id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

const updateUser = (data, callback) => {
    const queryString = `update user set first_name = ?, last_name = ?, gender = ?, email = ?, password = ?, number = ? where id = ?`;
    connection.query(
        queryString,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

const deleteUser = (data, callback) => {
    const queryString = `delete from user where id = ?`;
    connection.query(
        queryString,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

const getUserByEmail = async (email, callback) => {
    const queryString = `select * from user where email = ?`;
    connection.query(
        queryString,
        [email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
        }
    );
}


module.exports = {
    create,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
}
