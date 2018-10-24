var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//route指定
var spotRouter = require('./routes/spot');
var planRouter = require('./routes/plan');
var favoriteRouter = require('./routes/favorite');
var timelineRouter = require('./routes/timeline');
var imgRouter = require('./routes/imageUpload');
var usersRouter = require('./routes/users');


var app = express();
//cors全部許可
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//エンドポイント指定
app.use('/api/v1/spot',spotRouter);
app.use('/api/v1/plan',planRouter);
app.use('/api/v1/favorite',favoriteRouter);
app.use('/api/v1/timeline',timelineRouter);
app.use('/api/v1/image',imgRouter);
app.use('/api/v1/users',usersRouter);

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
