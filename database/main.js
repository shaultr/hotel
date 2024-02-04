const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hotel',
    password: process.env.SQL_PASSWORD || "1717"
});
module.exports = pool;