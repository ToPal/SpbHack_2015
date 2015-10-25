var handlers = [];

function addHandler(functionName, handler) {
    handlers.push({
        name: functionName,
        handler: handler
    });
}

function messageHandler (req, res, next) {
    var update_id = req.body,update_id;
    var message = req.body.message;

    if (message.length && message[0] == '/') {
        var functionName = message.split(' ')[0];
        console.log('function: %s, update_id: %s, message: %s', functionName, update_id, JSON.stringify(message));

        for (var i = 0; i < handlers.length; i++) {
            if (functionName == handlers[i].name) {
                return handlers[i].handler(req, res, next);
            }
        }
    }

    console.log('update_id: %s, message: %s', update_id, JSON.stringify(message));
    return res.json({});
}

addHandler('start', require('./bot_funcs/start'));

module.exports = messageHandler;