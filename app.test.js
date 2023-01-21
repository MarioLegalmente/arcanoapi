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
            message: 'Welcome to the ArcanoAPI',
        }

        console.log(response.text)
        expect(JSON.parse(response.text)).toEqual(expected);

    });

    test('set id for each incoming request', async () => {
        const response = await request(app).get('/request')

        expect(JSON.parse(response.text)).toHaveProperty('id')
    })

    test('can login with Authorization token', async () => {
        const response = await request(app)
            .post('/users/login')
            .set('Authorization', 'token')

        expect(JSON.parse(response.text)).toEqual({
            success: true
        });
    })

    test('cannot login withot Authorization token', async () => {
        const response = await request(app)
            .post('/users/login')

        expect(response.status).toEqual(401)
        expect(JSON.parse(response.text)).toEqual({
            error: 'Unauthorized'
        });
    })

    test('users can be create', async () => {
        const data = {
            name: 'MarioLegalmente',
            email: 'me@mariolegalmente.com'
        }
        const response = await request(app)
            .post('/users')
            .send(data)
            .set('Content-Type', 'application/json')

        expect(response.status).toEqual(201)
        expect(JSON.parse(response.text)).toEqual({
            data
        })
    })

    test('list with query parameters', async () => {
        const options = {
            offset: '0',
            limit: '10'
        }
        const response = await request(app)
.get(`/users?offset=${options.offset}&limit=${options.limit}`)

        expect(JSON.parse(response.text)).toEqual({
            data: [],
            meta: options
        })

    })
});
