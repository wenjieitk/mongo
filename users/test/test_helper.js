process.env.NODE_ENV = 'test'
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/Users_test';

mongoose.Promise = global.Promise;

// make sure the db is connected before run the test
before((done) => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true
    });

    mongoose.connection
        .once('open', () =>{
             console.log('db connected');
             done();
        })
        .on('error', (error) => {
            console.error('Unable connect to db\n', error);
        });
});


// beforeEach() runs before each test started
// remove all the test data before each test start
// test run only after the db data is remove
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // ready to run the next test
        done();
    });
});