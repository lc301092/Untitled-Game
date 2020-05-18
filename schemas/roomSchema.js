const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO figure out necessary field for rooms
// note unique id is auto generated
let roomSchema;

let room = mongoose.model('room', roomSchema);
