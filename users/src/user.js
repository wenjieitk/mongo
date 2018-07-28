const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,

        required: [
            true,
            'Name is required.'
        ],
        
        minlength: [
            2,
            'Name must be longer than 2'
        ]
        //or
        // validate: {
        //     validator: (name) => name.length > 1,
        //     message: 'Name must be longer than 2'
        // },
        // required and custom error message to user
    },
    postcount: Number
});

const User = mongoose.model('user', UserSchema); // User represent whole user collection of data

module.exports = User;