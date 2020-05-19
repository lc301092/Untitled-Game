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
var io = require('socket.io').listen(http);



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
		console.log('socket message: \n', msg);

		let message = msg.message;
		let user = msg.identifyingHandle;
		let room = msg.roomName;
		let hourStamp = new Date().toLocaleTimeString();



		let isCommand = message.charAt(0) == "/";
		let command = message.split('/')[1];
		let isCommandValid = validCommands.indexOf(command) != -1;

		// normal chat text
		if (!isCommand) {
			io.emit('chat message', hourStamp + ' --- ' + user + ': ' + message);
			return;
		}

		// wrong command
		if (isCommand && !isCommandValid) {
			io.emit('command error', "command doesn't exist");
			return;
		}

		switch (command) {
			case 'join room':
				// TODO change room functions
				io.emit('change room', "gametest");
				io.emit('chat message', hourStamp + ' : ' + user + " has joined a game");
				break;
			case 'lobby':
				// TODO change room functions
				io.emit('change room', "lobby");
				io.emit('chat message', hourStamp + ' : ' + user + " has joined the lobby");
				break;
			case 'rules':
				io.emit('chat message', gameRules.rules);
				break;
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
