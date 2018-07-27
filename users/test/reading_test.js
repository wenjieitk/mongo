const assert = require('assert');
const User = require('../src/user');

describe('Finding users out of database', () => {
    let joe;

    // insert testing data before every test
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => done());
    });

    it('finds all users wtih a name of joe', (done) => {
        User.find({
            name: 'Joe'
        }).then((users) => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });


});