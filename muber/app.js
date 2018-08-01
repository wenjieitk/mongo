const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Users_test', { useNewUrlParser: true });

app.use(bodyParser.json());

routes(app);

module.exports = app;