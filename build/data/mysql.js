'use strict';

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db_ip_address = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
var db_port = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;
var db_user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
var db_pass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '';


var connection = _mysql2.default.createConnection({
  host: db_ip_address,
  port: db_port,
  user: db_user,
  password: db_pass,
  database: 'mtome'
});

connection.connect(function (err) {
  if (err) throw err;
  console.error('mysql connected...');
});