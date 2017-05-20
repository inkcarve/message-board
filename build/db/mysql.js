'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db_ip_address = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
var db_port = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;
var db_user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
var db_pass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '123456';


var mysqlConfig = {
    host: db_ip_address,
    port: db_port,
    user: db_user,
    password: db_pass,
    database: 'mtome',
    connectionLimit: 100
};
var pool = _mysql2.default.createPool(mysqlConfig);

var db = function () {
    function db() {
        _classCallCheck(this, db);
    }

    _createClass(db, [{
        key: 'getDBData',
        value: function getDBData(cb, req) {
            console.log('--getDBData--');
            pool.getConnection(function (err, connection) {
                console.log('-- getConnection --');
                if (err) {
                    console.log('----getConnection error----');
                    console.error(err);
                }

                connection.query('SELECT COUNT(1) FROM message', [], function (err, rows) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(req);
                        var total = rows[0]['COUNT(1)'];
                        var activePage = req.activePage;
                        var offset = (req.activePage - 1) * req.itemsPerPage;
                        if (total <= offset) {
                            offset = Math.floor(total / req.itemsPerPage) * req.itemsPerPage;
                            activePage = Math.ceil(total / req.itemsPerPage);
                        }
                        offset = total > offset ? offset : offset - req.itemsPerPage;
                        connection.query('SELECT * FROM message limit ' + req.itemsPerPage + ' offset ' + offset, [], function (err, rows) {
                            if (err) {
                                console.error(err);
                            } else {
                                cb({ total: total, data: rows, activePage: activePage });
                            }
                            connection.release();
                        });
                    }
                });
            });
        }
    }, {
        key: 'getDBDataTotal',
        value: function getDBDataTotal(cb) {
            console.log('--getDBData Count--');
            pool.getConnection(function (err, connection) {
                console.log('-- getConnection --');
                if (err) {
                    console.log('----getConnection error----');
                    console.error(err);
                }

                connection.query('SELECT COUNT(1) FROM message', [], function (err, rows) {
                    if (err) {
                        console.error(err);
                    } else {
                        cb(rows);
                    }
                    connection.release();
                });
            });
        }
    }, {
        key: 'addDBdata',
        value: function addDBdata(new_data, cb) {
            pool.getConnection(function (err, connection) {
                console.log('-- getConnection --');
                if (err) {
                    console.log('----getConnection error----');
                    console.error(err);
                }
                var id = Date.now();
                console.log(id);
                connection.query('INSERT INTO message(author,text,add_date,add_time) VALUES(?,?,NOW(),NOW())', [new_data.author, new_data.text], function (err, rows) {
                    if (err) {
                        console.log('----INSERT INTO error----');
                        console.error(err);
                        return connection.rollback(function () {
                            throw err;
                        });
                    } else {
                        cb(rows);
                    }
                    connection.release();
                });
            });
        }
    }, {
        key: 'deleteDBdata',
        value: function deleteDBdata(data, cb) {
            pool.getConnection(function (err, connection) {
                console.log('-- getConnection --');
                if (err) {
                    console.log('----getConnection error----');
                    console.error(err);
                }
                var id = Date.now();
                console.log(id);
                connection.query('DELETE FROM message WHERE id=' + data.id, function (err, rows) {
                    if (err) {
                        console.log('----INSERT INTO error----');
                        console.error(err);
                        connection.release();
                        return connection.rollback(function () {
                            throw err;
                        });
                    } else {
                        connection.release();
                        cb();
                    }
                });
            });
        }
    }]);

    return db;
}();

exports.default = db;