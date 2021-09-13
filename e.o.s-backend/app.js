const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let login = require('./routes/login');
let category = require('./routes/category');
let product = require('./routes/product');
let orders = require('./routes/orders');
let promotions = require('./routes/promotions');
let sys_admin = require('./routes/sys-admin');
let user_perm = require('./routes/permissions');
let requests = require('./routes/requests');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// setup cors
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', login);
app.use('/category', category);
app.use('/product', product);
app.use('/orders', orders);
app.use('/promotions', promotions);
app.use('/sys-admin', sys_admin);
app.use('/user-permissions', user_perm);
app.use('/user-requests', requests);

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
