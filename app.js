var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var VerifyToken = require('./verifyToken');

//route指定
var spotRouter = require('./routes/spot');
var planRouter = require('./routes/plan');
var favoriteRouter = require('./routes/favorite');
var timelineRouter = require('./routes/timeline');
var imgRouter = require('./routes/imageUpload');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var jwt = require( 'jsonwebtoken' );
var session = require( 'express-session' );
var Auconfig = require('./Auconfig');
var app = express();

//鍵


//cors全部許可
app.use(cors());

//鍵をセット

//session設定
app.use( session({
    secret: Auconfig.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,           //. https で使う場合は true
      maxage: 1000 * 60 * 60   //. 60min
    }
  }) );

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
app.use('/api/v1/search',searchRouter);

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
