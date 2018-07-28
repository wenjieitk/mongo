const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        // required and custom error message to user
        required: [
            true,
            'Name is required.'
        ]
    },
    postcount: Number
});

const User = mongoose.model('user', UserSchema); // User represent whole user collection of data

module.exports = User;