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
            assert(users[0]._id.toHexString() === joe._id.toHexString());
            done();
        });
    });

    it('it should find a user with a particular id', (done) => {
        User.findOne({
            _id:joe._id
        }).then((user) => {
            assert(user.name === 'Joe');
            done();
        });
    });
});