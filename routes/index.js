var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', {
		title: 'Express'
	});
});
router.post('/login', function (req, res, next) {
	//TODO handle login validation here 


	let token = "some-kind-of-id-or-token";
	// if succesfull render the game or lobby page
	res.render('lobby', {
		title: 'Express',
		user: {
			name: 'MechaHitler',
			room: 'lobby',
			token: token
		}
	});
});

router.post('/enter_room', function (req, res, next) {
	res.render('game', {
		user: {
			name: 'MechaHitler',
			room: 'lobby',
			token: 'token from earlier'
		}
	})
});


module.exports = router;
