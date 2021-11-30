const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};



const initialize = async () => {
    console.log("Got db initialize");
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    sequelize.authenticate()
        .then(() => {
            console.log("Connected with DB...");
        })
        .catch(err => {
            console.error("Failed to connect db. ", err);
        });
        console.log("end of connection");

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize);



    // sync all models with database
    await sequelize.sync();

}

initialize();
