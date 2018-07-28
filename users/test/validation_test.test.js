const assert = require('assert');
const User = require('../src/user');

describe('Validating records',() => {

    // require
    it('it should requires a name', (done) => {
        const user = new User({
            name: undefined
        });
        // .validate() is async method, use it with callback
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message === 'Name is required.');
        done();
    });

    it('it should require a user\'s name longer than 2 characters',(done)=>{
        const user = new User({
            name: 'A'
        });
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2');
        done();
    });

    it('it should disallow invalid records from being saved', (done) => {
        const user = new User({
            name: 'A'
        });
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                
                assert(message === 'Name must be longer than 2');
                done();
            });
    });

});