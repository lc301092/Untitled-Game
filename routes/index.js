const express = require('express');
const router = express.Router();
const validCommands = ['join room', 'lobby', 'rules'];
const gameRules = require('../gameData');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', {
		title: 'Express'
	});
});

router.get('/dev_lobby', function (req, res, next) {
	res.render('lobby', {
		title: 'Express',
		user: {
			name: 'test-person'
		}

	});
});


// this probably should have its own route file
router.post('/chat_message', function (req, res, next) {
	let chatMessage = req.body.message;
	console.log(chatMessage);
	let isCommand = chatMessage.charAt(0) == "/";
	if (isCommand) {
		let command = chatMessage.split('/')[1];
		// if it is not -1 it means that it has an index in the array
		let isCommandValid = validCommands.indexOf(command) != -1;
		console.log('the is a command ' + command + ' and it is ' + isCommandValid);
		if (!isCommandValid)
			res.send({
				messageBack: 'Command doesn\'t exist'
			});
		if (command == "join room")
			res.send({
				messageBack: 'User joined game room',
				state: 'gametest'
			});
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
		res.send({
			messageBack: chatMessage
		});
	}
});

module.exports = router;
