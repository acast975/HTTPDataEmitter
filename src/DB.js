var mysql = require('mysql');
var config = require('../config');

var DB = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USER,
    password : config.DB_PASS,
    database : config.DB_NAME
});


module.exports = DB;