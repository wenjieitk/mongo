const express = require('express');
const routes = require('./routes/routes')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

routes(app);

module.exports = app;