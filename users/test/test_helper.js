process.env.NODE_ENV = 'test'
const mongoose = require('mongoose');

const mongoUri ='mongodb://localhost:27017/Users_test';

mongoose.Promise = global.Promise;

mongoose.connect(mongoUri, {
    useNewUrlParser: true
});