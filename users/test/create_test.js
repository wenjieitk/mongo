const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('it should saves a user', () => {
        //create instance
        const joe = new User({
            name: 'Joe'
        });

        joe.save();
    });
});