const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Luca:3010@cluster0-u29mo.mongodb.net/untitledDb";
const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const validCommands = ['join room', 'lobby', 'rules'];
const gameRules = require('./gameData');


var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/', (req, res) => {
	res.render('login', {
		title: 'Express'
	});

});

http.listen(4000, () => {
	console.log('listening on *:4000');
});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('chat message', function (msg) {
		console.log('socket message: \n' + msg);

		let chatMessage = msg;
		let isCommand = chatMessage.charAt(0) == "/";

		if (isCommand) {
			let command = chatMessage.split('/')[1];
			// if it is not -1 it means that it has an index in the array
			let isCommandValid = validCommands.indexOf(command) != -1;
			console.log('the is a command ' + command + ' and it is ' + isCommandValid);
			if (!isCommandValid)
				io.emit('command error', "command doesn't exist");
			if (command == "join room")
				io.emit('change room', "not yet defined");
				io.emit('chat message', "not yet defined");
			if (command == "lobby")
				res.send({
					messageBack: 'User joined the lobby',
					state: 'lobby'
				});
			if (command == "rules")
				res.send({
					messageBack: gameRules.rules
				});
		} else {
			io.emit('chat message', msg);
		}
	});


});



mongoose.connect(uri, config);
// if ever needed this is how to access the connection object 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
	console.log('connected correctly to db.');
});


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

module.exports = app;
