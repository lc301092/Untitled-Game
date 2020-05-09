var express = require('express');
var router = express.Router();
const validCommands = ['join room', 'lobby', 'active games'];

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', {
		title: 'Express'
	});
});

router.post('/login', function (req, res, next) {

	let user = req.body.uname;
	let password = req.body.psw;

	//TODO handle login validation here 


	let token = "some-kind-of-id-or-token";
	// if succesfull render the game or lobby page
	res.render('lobby', {
		title: 'Express',
		user: {
			name: user,
			room: 'lobby',
			token: token
		}
	});
});

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
	} else {
		res.send({
			messageBack: chatMessage
		});
	}
});

module.exports = router;
