const express = require('express');
const app = express();
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const socketDefinition = require('./routes/sockets.js');


const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Luca:3010@cluster0-u29mo.mongodb.net/untitledDb";
const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

mongoose.connect(uri, config);
// if ever needed this is how to access the connection object 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
	console.log('connected correctly to db.');
});
app.set('port', 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

let server = http.createServer(app);

server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

socketDefinition.initialize(server);
