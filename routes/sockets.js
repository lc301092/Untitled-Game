const validCommands = ['join room(1)', 'join room(2)', 'join room(3)', 'lobby', 'rules',
	'help', 'list rooms', 'dropItem', 'takeItem', 'items'];
const gameRules = require('../gameData');
const maxRooms = 3;
const WIP = 'not implemented yet';

let io = require('socket.io');
let rooms = ['lobby', 'room1', 'room2', 'room3'];
let room;

const userClass = require('../public/schemas/userSchema');
const roomClass = require('../public/schemas/roomSchema');



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
			console.log(userName);

			let isCommand = message.charAt(0) == "/";
			let command = message.split('/')[1];
			let isCommandValid = validCommands.indexOf(command) != -1;

			for (let k = 0; k < validCommands.length; k++) {
				if (message.includes(validCommands[k])) {
					isCommandValid = true;
					break;
				}
				isCommandValid = false;
			}


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


					if (message.includes("/dropItem")) {


						//Check if item exist in inventory of player
						let user = userClass.findOne({ username: userName }, {}, function (err, user) {
							console.log("HEY: User: " + user);
							if (user) {
								console.log("HEY2");
								let itemDropped = message.substring(message.indexOf("dropItem") + 9, message.length);

								if (user.items.indexOf(itemDropped) != -1) {
									console.log("HEY3 - itemdropped: " + itemDropped);
									let newItemArray = user.items;
									newItemArray.splice(newItemArray.indexOf(itemDropped), 1);
									console.log("new item array: " + newItemArray);
									let replacementObj = user;
									replacementObj.items = newItemArray;

									io.emit('chat message', hourStamp + ' : ' + userName + " has dropped the the item '" + itemDropped + "' in " + roomName);
									replacementObj.save();

									console.log("HEY4 - messagersRoom: " + roomName);
									//Update inventory of room.:
									let findRoomToReplace = roomClass.findOne({ roomName: roomName }, {}, function (err, roomFound) {
										console.log("found this room: " + roomFound);

										let replacementRoom = roomFound;
										replacementRoom.items.push(itemDropped);

										replacementRoom.save();
										io.emit('update room', replacementRoom);
									});

								} else {
									io.emit('chat message', userName + " tried to drop an item he didn't even have, what a noob");
								}
							}
						});

						//TODO: Server manipulation. 



						//Update inventory of room and inventory of player.
						return; //Do not do other commands, such as /takeitem or other.
					} else if (message.includes("/takeItem")) {



						let theroom = roomClass.findOne({ roomName: roomName }, {}, function (err, room) {
							console.log("HEY: ROOM: " + room);
							if (room) {
								console.log("HEY2");
								let itemTaken = message.substring(message.indexOf("takeItem") + 9, message.length);


								if (room.items.indexOf(itemTaken) != -1) {
									console.log("HEY3 - itemdropped: " + itemTaken);
									let newItemArray = room.items;
									newItemArray.splice(newItemArray.indexOf(itemTaken), 1);
									console.log("new item array: " + newItemArray);
									let replacementObj = room;
									replacementObj.items = newItemArray;

									io.emit('chat message', hourStamp + ' : ' + userName + " has taken the the item '" + itemTaken + "' in " + roomName);
									replacementObj.save();
									io.emit('update room', room);

									console.log("HEY4 - messagersRoom: " + roomName);
									//Update inventory of room.:
									let userToChange = userClass.findOne({ username: userName }, {}, function (err, user) {
										console.log("found this room: " + user);

										let replacementUser = user;
										replacementUser.items.push(itemTaken);

										replacementUser.save();

									});

								} else {
									io.emit('chat message', userName + " tried to take an item that isn't even in the room, what a noob");
								}
							}
						});
						//Check if item exist in inventory of room

						//Update inventory of room and inventory of player.
						//TODO: Server manipulation.

						return; //Do not do other commands, such as /takeitem or other.
					} else if (message.includes("items")) {
						let someUser = userClass.findOne({ username: userName }, {}, function (err, user) {
							socket.emit('chat message', "Your items: " + user.items);
						});

					} else {
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
			}
		});

		socket.on('disconnect', function () {
			numClients--;
			console.log('Disconnection; connected clients:' + numClients);
		});
	});
}
