var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./auth.json');
var common = require('./funcs/common');
var setWebHook = require('./funcs/bot_api/setWebhook');
var messageHandler = require('./funcs/messageHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var myUrl = common.getCurrentUrl();
var router = express.Router();
router.post('/' + auth.token_withoutDots, messageHandler);
app.use(router);

setWebHook(myUrl, function (err, response, body) {
  if (err) {
    console.log('Не удалось установить webHook для бота');
    process.exit(1);
  }
  
  if (response.statusCode !== 200) {
    console.log('Не удалось установить WebHook для бота, statusCode = %s, href: ', 
      response.statusCode, response.request.href);
    process.exit(2);
  }

  console.log('webHook для бота установлен.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
