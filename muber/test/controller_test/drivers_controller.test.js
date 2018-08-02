const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Driver = require('../../model/driver');

describe(' Driver controller test ', () => {

    it('it should POST to /api/drivers to creates a new driver',(done) => {
        Driver.countDocuments().then(count => {
            request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com'}) // send to our server
            .end(() => {
                Driver.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });

    it('it should PUT to /api/drivers/id edits and existing driver', done => {
        const driver = new Driver({
            email: 't@t.com',
            driving: false
        });        

        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({
                    driving: true
                })
                .end(() => {
                    Driver.findById(driver._id)
                        .then((driver) => {
                            assert(driver.driving === true);
                            done();
                        });
                });
        });
    });

    it('it should DELETE to /api/drivers/id can delete a driver', done => {
        const driver = new Driver({
            email: 't@t.com',
            driving: false
        });       

        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findById(driver._id)
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        });
                });
        });
    });

    it('it should GET to /api/drivers finds drivers location', done => {
        const driver1 = new Driver({
            email: 'driver1@test.com',
            geometry: {
                type: 'Point',
                coordinates: [-122.4759902, 47.6147628]
            }
        });

        const driver2 = new Driver({
            email: 'driver2@test.com',
            geometry: {
                type: 'Point',
                coordinates: [-80.253, 25.791]
            }
        });

        Promise.all([ driver1.save(),driver2.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err,res) => {
                        console.log(res.body);
                        done(); 
                    });
            })


    });

});