const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe',
            postcount: 1
        });
        joe.save()
            .then(() => done());
    });

    //save duplicate assertion work
    function assertName(operation, done) {
        operation // return of joe.save()
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0]._id.toHexString() === joe._id.toHexString());
            assert(users[0].name === 'Alex');
            done();
        });
    }


    it('it should update a records in method set n save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(),done);
    });


    it('it should update a model instance', (done) => {
        assertName(
            joe.update({
                name: 'Alex'
            })
            ,done
        );
    });

    it('it should update a model class', (done) => {
        // find then update
        assertName(
            User.update({
                name: 'Joe'
            }, {
                name: 'Alex'
            })
            ,done
        );
    });

    it('it should update a records in method findOneAndUpdate', (done) => {
        assertName(
            User.findOneAndUpdate({
                _id: joe._id
            },{
                name: 'Alex'
            })
            ,done
        );
    });


    it('it should update a records in method findByIdAndUpdate', (done) => {
        assertName(
            User.findOneAndUpdate(
                joe._id,
                {name: 'Alex'}
            ), done
        );
    });

    it('It should update postcount incremented by 1', (done) => {
        User.update({
            name: 'Joe'
        },{
            $inc: {
                postcount: 1
            }
        }).then(() => User.findOne({
            name: 'Joe'
        })).then((user) => {            
            assert(user.postcount === 2);
            done();
        });
    });

});