const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save().then(() => done());
    });

    it('it should remove a model instance',(done) => {
        joe.remove()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('it shoule remove in class method',(done)=>{
        // remove a bunch of records with some give criteria
        User.remove({
            name: 'Joe'
        }).then(() => User.findOne({
            name: 'Joe'
        })).then((user) => {
            assert(user === null);
            done();
        });
    });

    it('it shoule remove in class method findOneAndRemove', (done) => {
        // remove one record with some give criteria
        User.findOneAndRemove({
            name: 'Joe'
        }).then(() => User.findOne({
            name: 'Joe'
        })).then((user) => {
            assert(user === null);
            done();
        });
    });

    it('it shoule remove in class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({
                _id: joe._id
            })).then((user) => {
                assert(user === null);
                done();
            });
    });
});