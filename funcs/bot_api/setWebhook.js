var common = require('./../common');

function setWebhook (hookUrl, cb) {
    common.sendTelegramMessage('setWebhook', {
        url: hookUrl
    }, cb);
}

module.exports = setWebhook;