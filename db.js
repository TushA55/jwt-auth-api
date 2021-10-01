const mysql = require('mysql2')
const process = require('process')


let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL Database.");

    connection.query('CREATE TABLE IF NOT EXISTS users (user_id int(11) AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) NOT NULL, mobile_number VARCHAR(10) NOT NULL UNIQUE KEY, email VARCHAR(255), password TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)', (err, _) => {
        if (err) console.log('error:' + err)
    })
});

module.exports = connection