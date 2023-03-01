var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const session = require('cookie-session');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hospApi = require('./routes/hospApi');
var usersApi = require('./routes/usersApi');
var adminApi = require('./routes/adminApi');
//var sequrePages = require('./routes/secure-pages');

var app = express();

const sess = {
  name: 'client',
  secret: process.env.COOKIESECRET || 'keyboard cat',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
};

app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(function(req,res,next){
//   if(req.session.user && req.session.user.length > 2 ){
//     next();
//   }else{
//     res.redirect('/login')
//   }
// })

// app.use('/', sequrePages);
app.use('/api/v1/admin', adminApi);
app.use('/api/v1/hosp', hospApi);
app.use('/api/v1/users', usersApi);

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

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening to the port: ${PORT}`);
  process.on('uncaughtException', (err, data) => {
    try{
      if(process.on('message', (data) => {
        return data;
      })){
       console.log(data);
      }
    }catch(err){
     console.log(err);
     return err;
    };
    console.log(err.message);
  });
});

server.on('connect', (err) => {
  if(err) throw err;
  process.on('message', (data) => {
    return data;
  });
});

server.on('close', (data) => {
  return data;
});

module.exports = app;
