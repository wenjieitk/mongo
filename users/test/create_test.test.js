const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('it should saves a user', (done) => {
        //create instance
        const joe = new User({
            name: 'Joe'
        });

        joe.save().then(() => {
            // has joe been saved successfully?
            assert(!joe.isNew);
            done();
        });
    });
});