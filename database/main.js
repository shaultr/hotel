const mysql = require('mysql2/promise');
require("dotenv").config({ path: '../.env' });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'the_hotel',
    password: "7118181"
});
module.exports = pool;