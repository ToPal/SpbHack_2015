var common = require('../common');
var controller = require('../../Controllers');
var async = require('async');

module.exports = function (req, res, next) {
    var chat_id = req.body.message.chat.id;
    var userTelegramId = req.body.message.from.id;

    async.waterfall([
        function (cb) {
            controller.findUserByTelegramId(userTelegramId, cb);
        },
        function (User, cb) {
            if (User.length == 0) {
                var userName = req.body.message.from.first_name + req.body.message.from.last_name;
                return controller.addUser(userName, userTelegramId, cb);
            }

            return cb(null, User);
        },
        function (Users, cb) {
            var User = Users[0];

            async.waterfall([
                function (cb2) {
                    controller.findDelivering({
                        executor_id: User.id,
                        status: 0
                    }, cb2);
                },
                function (Deliverings, cb2) {
                    if (Deliverings.length == 0) {
                        return controller.addDelivering(User.id, undefined, undefined, undefined, undefined, cb);
                    }
                    cb2(null, Deliverings);
                }
            ], function (err) {
                return cb(err);
            });
        },
        function (Deliverings, cb) {
            var text = "Откуда вы поедете? Напишите адрес или укажите точку на карте.";
            common.sendTelegramMessage('sendMessage', {
                chat_id: chat_id,
                text: text
            });
        }
    ], function (err) {
        if (err) return res.json({});
    });
};