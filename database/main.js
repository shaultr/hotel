const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'the_hotel',
    password: process.env.SQL_PASSWORD || "1717"
});
module.exports = pool;