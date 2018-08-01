const express = require('express');

const app = express();

//req -> incoming requests; res -> outgoing response
app.get('/api', (req, res) => {
    res.send({
        hi: 'there'
    });
});

module.exports = app;