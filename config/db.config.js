const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTIONLIMIT
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected...");
})

module.exports = connection;
