const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe(' Driver controller test ', () => {

    it('it should Post to /api/drivers to creates a new driver',(done) => {
        request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com'}) // send to our server
            .end(() => {
                done();
            });
    });

});