var orm  = require('orm');
var auth = require('../auth.json');
var util = require('util');

var connection = null;

function setup(db, cb) {
    require('./Structure')(orm, db);

    return db.sync(function (err) {
        if (err) return cb(err);

        connection = db;
        cb(null, db);
    });
}

module.exports = function (cb) {
    if (connection) return cb(null, connection);

    var mysql_str = util.format("mysql://%s:%s@%s/%s", auth.dbName, auth.dbPass, auth.dbAddr, auth.dbName);

    orm.connect(mysql_str, function (err, db) {
        if (err) return cb(err);

        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};