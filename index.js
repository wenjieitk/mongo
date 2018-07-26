const express = require('express');
const {port, mongoose} = require('./config/db');

let app = express();



/******** Port listening *********/
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};