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
	
});

module.exports = router;
