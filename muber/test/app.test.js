const assert = require('assert');
const request = require('supertest');
const app = require('../app')

describe('test express app', () => {
    it('it should handles a GET request to /api', (done) => {
        request(app)
            .get('/api')
            .end((err, response) => { // callback function
                assert(response.body.hi === 'there');
                done();
            });
    });
});