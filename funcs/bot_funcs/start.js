var common = require('../common');

module.exports = function (req, res, next) {
    var text = "Hi! I'm P2P-deliverybot and I will help you.\n" +
               "Send me '/go' if you want your staff to be delivered";
               
    var chat_id = req.body.message.chat.id;
    common.sendTelegramMessage('sendMessage', {
        chat_id: chat_id,
        text: text
    });
    
    return res.json({});
};