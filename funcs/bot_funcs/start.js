module.exports = function (req, res, next) {
    var text = "Hi! I'm P2P-deliverybot and I will help you.\n" +
               "Send me '/go' if you want your staff to be delivered";

    return res.json({
        chat_id: req.body.chat_id,
        text: text
    });
};