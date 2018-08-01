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

});