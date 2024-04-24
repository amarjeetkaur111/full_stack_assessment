
const dotenv = require('dotenv');
const mysql = require('mysql2');
const mongoose = require('mongoose');

dotenv.config();

// MYSQL connection for users
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


//MONGO connection for subsciption
const uri = process.env.MONGODB_URI;
const mongoConn = mongoose    
                        .connect(uri, {
                            useNewUrlParser:true,
                            useUnifiedTopology:true
                        })
                        .then(()=>console.log("Connected to MongoDB"))
                        .catch((e) => console.log(`Failed to Connect : ${e}`));

module.exports =  { mysqlConnection ,mongoConn}