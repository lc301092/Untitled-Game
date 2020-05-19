const validCommands = ['join room(1)', 'join room(2)', 'join room(3)', 'lobby', 'rules', 'help', 'list rooms'];
const gameRules = require('../gameData');
const maxRooms = 3;
const WIP = 'not implemented yet';

let io = require('socket.io');
let rooms = ['lobby', 'room1', 'room2', 'room3'];
let room;



exports.initialize = function (server) {
	io = io.listen(server);

	var numClients = 0;

	io.on('connection', function (socket) {
		numClients++;
		console.log('a user connected');
		console.log('total users: ' + numClients);

		//join the lobby
		socket.join(rooms[0]);



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
					if (roomName != 'lobby') {

						console.log(roomName);
						let currentRoomIndex = roomName.split('room')[1].trim();
						// be sure it is a number
						if (!isNaN(currentRoomIndex)) {
							socket.leave(rooms[currentRoomIndex]);
						}
						socket.join(rooms[0]);
						socket.emit('change room', "lobby");
						io.emit('chat message', hourStamp + ' : ' + userName + " has left " + roomName);
						io.emit('chat message', hourStamp + ' : ' + userName + " has joined the lobby");
					}
					break;
				case 'rules':
					io.emit('chat message', gameRules.rules);
					break;
				case 'help':
					// list command array
					socket.emit('chat message', validCommands.toString());
					break;
				case 'list rooms':
					io.emit('chat message', WIP);
					break;
				default:
					// the command is join room with a number.
					let gameRoomIndex = command.slice(command.length - 2, command.length - 1).trim();
					let newRoom = rooms[gameRoomIndex];
					// TODO validate if can change room
					console.log('current room: ' + roomName);
					console.log('new room: ' + rooms[gameRoomIndex]);

					socket.leave(roomName);
					socket.join(rooms[gameRoomIndex])
					socket.emit('change room', rooms[gameRoomIndex]);
					io.emit('chat message', hourStamp + ' : ' + userName + " has joined " + rooms[gameRoomIndex]);
					break;
			}
		});

		socket.on('disconnect', function () {
			numClients--;
			console.log('Disconnection; connected clients:' + numClients);
		});
	});
}
