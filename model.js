const mysql = require("mysql2/promise");

mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: "root",
  password: process.env.PASS,
  database: process.env.DB_NAME,
});

module.exports = mysqlPool;
