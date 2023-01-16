import request from 'supertest'
import app from './app.js'


describe('API', () => {

    test('has a root endpoint', async () => {
        const response = await request(app).get('/')
        const expected = 'Hello World';

        expect(response.text).toEqual(expected);
    });

    test('has a catch endpoint', async () => {
        const response = await request(app).get('/unknwon')
        const expected = 'Route not found';

        expect(response.text).toEqual(expected);
    });
});
