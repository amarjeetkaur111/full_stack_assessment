
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const mysqlConnection =  mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

mysqlConnection.connect((err) => {
if(err)
    console.log('Error in Mysql Connection'+JSON.stringify(err));
else
    console.log('Connected to MySql');
});

module.exports =  { mysqlConnection }