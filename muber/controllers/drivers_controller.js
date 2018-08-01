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
    },

    edit(req,res,next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(driverId, driverProps, { new: true })
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req,res,next) {
        const driverId = req.params.id;
        
        Driver.findByIdAndRemove(driverId)
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }

}