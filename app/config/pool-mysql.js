require('dotenv').config()
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

// now get a Promise wrapped instance of that pool
const pollMysql = pool.promise();

module.exports = pollMysql;
