const Driver = require('../model/driver');

module.exports = {

    greeting(req,res) {
        res.send({ // send to client
            hi: 'hi there'
        });
    },

    create(req, res) {
        console.log(req.body);
        
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver));
    }

}