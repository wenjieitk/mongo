const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost:27017/muber_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open',() => done())
        .on('error', err => {
            console.warn('Unable to connect db\n',err);            
        });
});

beforeEach(done => {
    const {drivers} = mongoose.connection.collections;
    // mongoose.connection.db.dropDatabase()
    drivers.drop()
        .then(() => drivers.ensureIndex({'geometry.coordinates' : '2dsphere'})) // to ensure index is in place after drop the db
        .then(() => done())
        .catch(() => done());
});