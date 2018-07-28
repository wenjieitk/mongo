const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    postcount: Number
});

const User = mongoose.model('user', UserSchema); // User represent whole user collection of data

module.exports = User;