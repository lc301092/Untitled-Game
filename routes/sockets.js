const validCommands = ['join room(0)', 'join room(1)', 'join room(2)', 'lobby', 'rules'];
const gameRules = require('../gameData');
const maxRooms = 3;

let io = require('socket.io');
let rooms = ['room0', 'room1', 'room2'];
let room;



exports.initialize = function (server) {
	io = io.listen(server);



	io.on('connection', function (socket) {
		console.log('a user connected');
		socket.on('chat message', function (msg) {
			console.log('socket message: \n', msg);

			// assumes a perfect msg object 
			let message = msg.message;
			let userName = msg.identifyingHandle;
			let roomName = msg.roomName;
			let hourStamp = new Date().toLocaleTimeString();

			let isCommand = message.charAt(0) == "/";
			let command = message.split('/')[1];
			let isCommandValid = validCommands.indexOf(command) != -1;

			// normal chat text
			if (!isCommand) {
				io.emit('chat message', hourStamp + ' --- ' + userName + ': ' + message);
				return;
			}

			// wrong command
			if (isCommand && !isCommandValid) {
				io.emit('command error', "command doesn't exist");
				return;
			}

			switch (command) {
				case 'lobby':
					// TODO change room functions
					io.emit('change room', "lobby");
					io.emit('chat message', hourStamp + ' : ' + userName + " has joined the lobby");
					break;
				case 'rules':
					io.emit('chat message', gameRules.rules);
					break;
				default:
					// the command is join room with a number.
					let gameRoomIndex = command.slice(command.length - 2, command.length - 1).trim();
					console.log('user wants to join this room: ' + newRoom);

					// TODO change room functions
					io.emit('change room', "gametest");
					io.emit('chat message', hourStamp + ' : ' + userName + " has joined a game");
					break;
			}
		});
	});
}
