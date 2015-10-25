var auth = require('../auth.json');
var request = require('request');

function getCurrentUrl() {
    return 'https://api.telegram.org/' + auth.token;
}

function sendTelegramMessage(functionName, data, cb) {
    var url = getCurrentUrl() + '/' + functionName;

    request.post({
        url: url,
        json: true,
        form: data
    }, cb);
}

module.exports = {
    getCurrentUrl: getCurrentUrl,
    sendTelegramMessage: sendTelegramMessage
};