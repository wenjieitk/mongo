const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

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
    // sub-documents
    posts: [PostSchema],
    likes: Number
});

UserSchema.virtual('postcount').get(function() {
    // this -> getter, user instances
    return this.posts.length;
});

const User = mongoose.model('user', UserSchema); // User represent whole user collection of data

module.exports = User;