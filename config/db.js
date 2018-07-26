const mongoose = require('mongoose');

const {
    env,
    port
} = require('./env');

const mongoUri = (env === 'test') ? 'mongodb://localhost:27017/Users_test' :
    (env === 'development') ? 'mongodb://localhost:27017/Users':
    'mongodb://jiecavman:root123@ds137581.mlab.com:37581/node_1';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
    useNewUrlParser: true
});

module.exports = {
    mongoose,
    port
};