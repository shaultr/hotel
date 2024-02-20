const mysql = require('mysql2/promise');
require("dotenv").config({ path: '../.env' });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hotel',
    password: process.env.SQL_PASSWORD
});
module.exports = pool;