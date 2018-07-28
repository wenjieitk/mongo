const assert = require('assert');
const User = require('../src/user');

describe('Validating records',() => {
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
});