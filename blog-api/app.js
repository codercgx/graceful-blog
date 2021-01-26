var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articles')
var uploadRouter = require('./routes/upload')
var pageRouter = require('./routes/page')
var albumRouter= require('./routes/album')
var demoRouter= require('./routes/demo')

const session = require('express-session')

var app = express();
app.use(session({
  secret: 'dsakljfldkjflkjgfdjg', //密钥
  cookie: { maxAge: 60 * 1000 * 120 }, //过期时间两小时
  resave: false,
  saveUninitialized: true
}))

app.use(require('cors')())
// app.use(express.json())
require('./plugins/db')(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));


// var bodyParser = require('body-parser');

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/article', articleRouter)
app.use('/upload', uploadRouter)
app.use('/page', pageRouter)
app.use('/album',albumRouter)
app.use('/demo',demoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
