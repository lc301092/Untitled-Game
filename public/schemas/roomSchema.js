const mongoose = require('mongoose');

const Schema = mongoose.Schema();

// TODO figure out necessary field for rooms
// note unique id is auto generated
let roomSchema = new Schema({
    roomName: String,
    items: [String],
});

let room = mongoose.model('room', roomSchema);


module.exports = roomSchema;