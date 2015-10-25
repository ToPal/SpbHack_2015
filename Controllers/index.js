var getDB = require('../Models');

module.exports = {
    addUser: function (data, cb) {
        getDB(function(err, db) {
            if (err) return cb(err);

            db.models.User.create(data, cb)
        });
    },

    findUserByTelegramId: function (telegramId, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            db.models.User.find({
                telegram_id: telegramId
            }, cb)
        });
    },

    addDelivering: function (data, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            data.status = data.status || 0;

            db.models.Delivering(data, cb);
        });
    },

    findDelivering: function (findParams, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            db.models.Delivering.find(findParams, cb);
        });
    }
};