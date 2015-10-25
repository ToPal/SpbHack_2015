module.exports = function (orm, db) {

    var User = db.define("Executor", {
        name: String,
        rating: Number,

        telegram_id: String,
        vk_id: String,
        email: String,
        phone: String
    });

    var Delivering = db.define("Delivering", {
        client: Number,
        executor: Number,
        from: Number,
        to: Number,
        time: String,
        status: String // 0 - не заполнена, 1 - заполнена и ждет ответа, 2 - исполнена
    });

};