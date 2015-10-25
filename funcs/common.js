var auth = require('../auth.json');
var request = require('request');

function getCurrentUrl() {
    return 'https://sbphack-2015-topal.c9.io/' + auth.token;
}

function getTelegramUrl() {
    return 'https://api.telegram.org/' + auth.token;
}

function sendTelegramMessage(functionName, data, cb) {
    var url = getTelegramUrl() + '/' + functionName;

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