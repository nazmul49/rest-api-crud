// const dbConfig = require('../config/db.config.js');

// const { Sequelize, DataTypes } = require('sequelize');

// // creating instance of Sequelize
// // passing necessary data inside constructor
// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD,
//     {
//         host: dbConfig.HOST,
//         dialect: dbConfig.dialect,
//         operatorsAliases: false,

//         pool: {
//             max: dbConfig.pool.max,
//             min: dbConfig.pool.min,
//             acquire: dbConfig.pool.acquire,
//             idle: dbConfig.pool.idle
//         }
//     }
// );

// // authenticate db using sequelite 
// sequelize.authenticate()
//     .then(() => {
//         console.log("DB connected...");
//     })
//     .catch(err => {
//         console.log("DB athenticate error :", err);
//     });


// const db = {};

// db.Sequelize = Sequelize; // Sequelize constructor
// db.sequelize = sequelize; // instance of Sequelize


// // init models and add them to the exported db object
// db.users = require('./user.model.js')(sequelize, DataTypes);

// // sync all models with database
// db.sequelize.sync({ force: false })
//     .then(() => {
//         console.log('yes re-sync is done!');
//     });

// module.exports = db;