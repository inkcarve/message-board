const db_ip_address = process.env.OPENSHIFT_MYSQL_DB_HOST  || '127.0.0.1';
const db_port = process.env.OPENSHIFT_MYSQL_DB_PORT  || 3306;
const db_user = process.env.OPENSHIFT_MYSQL_DB_USERNAME  || 'root';
const db_pass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD  || '';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: db_ip_address,
  port: db_port,
  user: db_user,
  password: db_pass,
  database: 'mtome'
});

connection.connect(function(err) {
  if (err) throw err;
  console.error('mysql connected...');
});