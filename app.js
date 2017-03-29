var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config/config');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var fs = require('fs');

fs.readdirSync('./models/').forEach(function(file) {
    if (~file.indexOf('.js')) {
        require('./models/' + file);
    }
});

mongoose.connect(config.DBUrl);

var db = mongoose.connection;

db.on('error', function(err) {
    console.error("Mongo connection error: ", err);
});

db.on('open', function callback() {
    console.info("Mongo connection established");
});

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var profile = require('./routes/profile');
var users = require('./routes/users');
var logout = require('./routes/logout');

require('./config/passport')(passport);

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
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: config.SessionSecret,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
