const assert = require('assert');
const User = require('../src/user');

describe('Finding users out of database', () => {
    let joe, maria,alex,zach;

    // insert testing data before every test
    beforeEach((done) => {
        joe = new User({
            name: 'joe'
        });
        maria = new User({
            name: 'maria'
        });
        alex = new User({
            name: 'alex'
        });
        zach = new User({
            name: 'zach'
        });

        Promise.all([
            joe.save(),
            maria.save(),
            alex.save(),
            zach.save()
        ]).then(() => done());

    });

    it('finds all users wtih a name of joe', (done) => {
        User.find({
            name: 'joe'
        }).then((users) => {
            assert(users[0]._id.toHexString() === joe._id.toHexString());
            done();
        });
    });

    it('it should find a user with a particular id', (done) => {
        User.findOne({
            _id:joe._id
        }).then((user) => {
            assert(user.name === 'joe');
            done();
        });
    });

    it('it should skip and limit the result set', (done) => {
        User.find({})
            .sort({
                name: 1
            })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'joe');
                assert(users[1].name === 'maria');
                done();
            })
    });
});