const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userClass = require('../public/schemas/userSchema');
const roomClass = require('../public/schemas/roomSchema')
const userDb = 'userDatabase';
const userCollection = 'users';


/* GET users listing. */
router.post('/createUser', function (req, res, next) {

	let userName = req.body.uname;
	let password = req.body.psw;
	let returnMessage = {};

	// userClass already has db reference through the mongoose model connect
	userClass.findOne({
		username: userName
	}, {}, function (err, userFound) {
		if (userFound) {
			console.log('username match, cannot create new user');
			res.send(JSON.stringify(returnMessage.message = 'Account name is taken'))
			return;
		}


		let newUser = new userClass({
			username: userName,
			password: password
		});

		console.log('Trying to creating user with ', newUser);

		newUser.save(function (err) {
			if (err) {
				console.log(err);
				res.error();
			}
		});
		res.send(JSON.stringify(returnMessage.message = 'Account created'));

	});


});

router.post('/login', function (req, res, next) {

	let userName = req.body.uname;
	let password = req.body.psw;

	// check if 
	let user = userClass.findOne({
		username: userName,
		password: password
	}, {}, function (err, user) {
		console.log(user);
		if (user) {
			let token = "some-kind-of-id-or-token";
			// if succesful, render the game or lobby page
			res.cookie('activeUser', JSON.stringify({
				username: userName,
				room: 'lobby',
				token: token
			}));

			//TODO: Populate arrays



			let rooms = roomClass.find({}, {}, function (err, room) {

				console.log("Room: \n " + room);

				if (room) {
					lobbyItems = [room.indexOf["lobby"].items];
					room1 = [room.indexOf["room1"].items];
					room2 = [room.indexOf["room2"].items];
					room3 = [room.indexOf["room3"].items];


					let roomItems = {
						lobby: lobbyItems,
						room1: room1,
						room2: room2,
						room3: room3
					}

					res.render('lobby', {
						title: 'Express',
						user: {
							name: userName
						},
						roomItems: roomItems
					});

				}
			});




		} else {
			// user doesnt exist
			res.redirect('/');
		}

	});



});


module.exports = router;
