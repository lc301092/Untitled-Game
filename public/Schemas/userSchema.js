const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

let userSchema = new Schema({
	username: String,
	password: String,
});

let user = mongoose.model('user', userSchema);

// this was to create individual connection models. dont use that.
module.exports = user;
