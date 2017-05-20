const db_ip_address = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
const db_port = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;
const db_user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
const db_pass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '123456';
import mysql from 'mysql';

const mysqlConfig = {
    host: db_ip_address,
    port: db_port,
    user: db_user,
    password: db_pass,
    database: 'mtome',
    connectionLimit: 100
};
const pool = mysql.createPool(mysqlConfig);

class db {
    getDBData(cb,req) {
        console.log('--getDBData--');
        pool.getConnection((err, connection) => {
            console.log('-- getConnection --');
            if (err) {
                console.log('----getConnection error----');
                console.error(err);
            }

            connection.query('SELECT COUNT(1) FROM message', [], function(err, rows) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(req);
                    let total = rows[0]['COUNT(1)'];
                    let activePage = req.activePage;
                    let offset = (req.activePage -1)*req.itemsPerPage;
                    if(total <= offset){
                        offset = Math.floor(total / req.itemsPerPage) * req.itemsPerPage;
                        activePage = Math.ceil(total / req.itemsPerPage);
                    }
                    offset = total > offset ? offset : offset - req.itemsPerPage;
                    connection.query('SELECT * FROM message limit '+ req.itemsPerPage +' offset ' + offset, [], function(err, rows) {
                        if (err) {
                            console.error(err);
                        } else {
                            cb({total:total,data:rows,activePage:activePage});
                        }
                        connection.release();
                    });
                }
            });


        });
    };

    getDBDataTotal(cb) {
        console.log('--getDBData Count--');
        pool.getConnection((err, connection) => {
            console.log('-- getConnection --');
            if (err) {
                console.log('----getConnection error----');
                console.error(err);
            }

            connection.query('SELECT COUNT(1) FROM message', [], function(err, rows) {
                if (err) {
                    console.error(err);
                } else {
                    cb(rows);
                }
                connection.release();
            });
        });
    };

    addDBdata(new_data, cb) {
        pool.getConnection(function(err, connection) {
            console.log('-- getConnection --');
            if (err) {
                console.log('----getConnection error----');
                console.error(err);
            }
            let id = Date.now();
            console.log(id);
            connection.query('INSERT INTO message(author,text,add_date,add_time) VALUES(?,?,NOW(),NOW())', [new_data.author, new_data.text], function(err, rows) {
                if (err) {
                    console.log('----INSERT INTO error----');
                    console.error(err);
                    return connection.rollback(function() {
                        throw err;
                    });
                } else {
                    cb(rows);
                }
                connection.release();
            });
        });
    };

    deleteDBdata(data, cb) {
        pool.getConnection(function(err, connection) {
            console.log('-- getConnection --');
            if (err) {
                console.log('----getConnection error----');
                console.error(err);
            }
            let id = Date.now();
            console.log(id);
            connection.query('DELETE FROM message WHERE id=' + data.id, function(err, rows) {
                if (err) {
                    console.log('----INSERT INTO error----');
                    console.error(err);
                    connection.release();
                    return connection.rollback(function() {
                        throw err;
                    });
                } else {
                    connection.release();
                    cb();
                }

            });
        });
    };
}

export default db;
