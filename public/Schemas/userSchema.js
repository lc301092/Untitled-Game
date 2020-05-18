const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO figure out necessary/handle fields for any user
let userSchema = new Schema({
	username: String,
	password: String,
});

let user = mongoose.model('user', userSchema);

module.exports = user;
