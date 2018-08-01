const Driver = require('../model/driver');

module.exports = {

    greeting(req,res) {
        res.send({ // send to client
            hi: 'hi there'
        });
    },

    create(req, res, next) {
        
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    }

}