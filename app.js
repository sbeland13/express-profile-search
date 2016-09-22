'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Import static css & js files from public folder
app.use(express.static(__dirname + '/public'));

// connect our routes 
app.use(routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
