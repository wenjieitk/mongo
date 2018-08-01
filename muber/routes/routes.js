const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

    // passing reference to controller
    app.get('/api', DriversController.greeting);

    app.post('/api/drivers', DriversController.create);
    
};