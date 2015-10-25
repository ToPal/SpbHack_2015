var common = require('../common');

module.exports = function (req, res, next) {
    var text = "Привет! Я - бот-доставщик грузов P2P и я помогу тебе..\n" +
               "Если ты хочешь доставить груз по пути и заработать, введи /еду\n" +
               "Если ты хочешь отправить груз за небольшую плату, введи /отправить";
               
    var chat_id = req.body.message.chat.id;
    common.sendTelegramMessage('sendMessage', {
        chat_id: chat_id,
        text: text
    });
    
    return res.json({});
};