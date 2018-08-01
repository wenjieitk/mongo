const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Driver = require('../../model/driver');

describe(' Driver controller test ', () => {

    it('it should Post to /api/drivers to creates a new driver',(done) => {
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

});