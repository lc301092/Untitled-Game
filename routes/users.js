const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userClass = require('../public/Schemas/userSchema');
const userDb = 'userDatabase';
const userCollection = 'users';


/* GET users listing. */
router.post('/createUser', function (req, res, next) {

	let userName = req.body.uname;
	let password = req.body.psw;
	let returnMessage = {};

	console.log('Creating user with ' + userName);

	let user = new userClass({
		username: userName,
		password: password
	});

	user.save(function (err) {
		if (err) {
			console.log(err);
			res.send(JSON.stringify(returnMessage.error = 'error occured'));
		}
	});
	res.send(JSON.stringify(returnMessage.message = 'Account created'));


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


module.exports = router;
