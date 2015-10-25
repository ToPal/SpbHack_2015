var getDB = require('../Models');

module.exports = {
    addUser: function (name, cb) {
        getDB(function(err, db) {
            if (err) return cb(err);

            db.models.Users.create({
                name: name
            }, cb)
        });
    },

    findUserByTelegramId: function (telegramId, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            db.models.Users.find({
                telegram_id: telegramId
            }, cb)
        });
    },

    addDelivering: function (executorId, clientId, from, to, time, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            db.models.Delivering({
                executor: executorId,
                client: clientId,
                from: from,
                to: to,
                time: time,
                status: 0
            }, cb);
        });
    },

    findDelivering: function (findParams, cb) {
        getDB(function (err, db) {
            if (err) return cb(err);

            db.models.Delivering.find(findParams, cb);
        });
    }
};