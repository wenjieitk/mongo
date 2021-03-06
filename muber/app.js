const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/muber', { useNewUrlParser: true });
}

app.use(bodyParser.json());

routes(app);

// define middleware after routes
// next -> go to next middleware
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

module.exports = app;