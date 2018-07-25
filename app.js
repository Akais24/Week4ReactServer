var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var boardRouter = require('./routes/board');
var postRouter = require('./routes/post');
var post_inputRouter = require('./routes/post_input');
var passfailRouter = require('./routes/passfail');
var photosRouter = require('./routes/photos');
var imageRouter = require('./routes/images');

var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});


var User = require('./models/user');
var Post = require('./models/post');
var Count = require('./models/count');

mongoose.connect('mongodb://localhost/week4');

var app = express();

app.use(bodyParser.json({limit : '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit : '50mb' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/join', joinRouter);
app.use('/board', boardRouter);
app.use('/post', postRouter);
app.use('/post_input', post_inputRouter);
app.use('/passfail', passfailRouter);
app.use('/photos', photosRouter);
app.use('/image', imageRouter);

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
