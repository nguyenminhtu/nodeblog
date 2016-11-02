var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://tunguyen:nguyenminhtu95@ds021984.mlab.com:21984/simpleblog');
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var moment = require('moment');


//set route
//client route
var index = require('./routes/client/index');
var posts = require('./routes/client/posts');

//route admin
var admin = require('./routes/admin/index');
var admin_posts = require('./routes/admin/posts');
var admin_users = require('./routes/admin/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'tudeptrai',
  saveUninitialized: true,
  resave: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());


// Flash
app.use(flash());


// Global variable
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  res.locals.moment = moment;
  res.locals.changeColorText = function(text, keyword){
    if(text.indexOf(keyword) >= 0){
      return text.replace(keyword, "<span style='color: red'>"+keyword+"</span>")
    }
  }
  res.locals.shortText = function (text, limit) {
    return text.substring(0, limit);
  }
  res.locals.title = '';
  next();
});


// Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', index);
app.use('/posts', posts);

//admin
app.use('/admin', admin);
app.use('/admin/posts', admin_posts);
app.use('/admin/users', admin_users);

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
