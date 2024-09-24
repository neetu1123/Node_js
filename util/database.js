const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'development',
    password: 'Str0ng!Passw0rd'
});

module.exports = pool.promise();
