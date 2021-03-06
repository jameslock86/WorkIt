var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//reads the data sent
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knex = require ('knex');
var index = require('./routes/index');
var users = require('./routes/users');
// var profile = require('./routes/profile');
//password stuff
var passport = require('passport');
var session = require('express-session');
var db = require('knex')({ client: 'pg', connection:{ filename: 'test.pg' } });
// var users = require('routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//working on the passport login part
app.use(session({
	secret: process.env.SECRET_KEY || 'NOIWEFJLWEKFJFEW',
	resave: false,
	saveUninitialized: true
}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

//which directory are we working in
app.use(express.static(path.join(__dirname, 'public')));



//middleware application

app.use('/', index);
app.use('/users', users);
// app.use('/users/:id', profile);


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
