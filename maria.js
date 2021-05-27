var maria = require('mysql');
var conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'dbp',
    password:'1234',
    database:'realdb',
    multipleStatements: true
});
module.exports = conn;