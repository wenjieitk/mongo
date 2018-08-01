const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

    //req -> incoming requests; res -> outgoing response
    app.get('/api', DriversController.greeting);
    
};