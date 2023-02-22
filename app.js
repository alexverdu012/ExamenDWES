var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//SESSION
const  session  = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
require('dotenv').config()
require('./lib/passport')

//ROUTER 
var authRouter = require('./routes/auth');
var fotosRouter = require('./routes/fotos')
var comRouter = require('./routes/comentarios')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//TODO LO RELACIONADO CON SESSIONS
app.use(flash())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//ROUTERS
app.use('/auth', authRouter);
app.use('/comentarios', comRouter);

app.use('/', fotosRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
