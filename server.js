var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env 
require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');
require('./config/passport');



var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
const tasksRouter = require('./routes/tasks');
const schedulesRouter = require('./routes/schedules');
const icsRouter = require('./routes/icsRouter');

var app = express();


// middleware for cors to allow cross origin resource sharing
app.use(cors());

// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/', tasksRouter);
app.use('/', schedulesRouter);
app.use('/', icsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Requested URL:', req.url);
  next();
  
  // next(createError(404));
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