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

    test('supports JSON format', async () => {
        const response = await request(app).get('/healthy');
        const expected = {
            message:'Welcome to the ArcanoAPI',
        }

        console.log(response.text)
        expect(JSON.parse(response.text)).toEqual(expected);
        
    });

    test('set id for each incoming request', async () => {
        const response = await request(app).get('/request')

        expect(JSON.parse(response.text)).toHaveProperty('id')
    })
});
