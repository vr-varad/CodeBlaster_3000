import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../providers/Express.js';
import { Database } from '../providers/Database.js';

describe('API Tests', () => {

    beforeAll(async () => {
        await Database.init();
    });

    it('POST /api/v1/submit should submit code successfully', async () => {

        const response = await request(app)
            .post('/api/v1/submit').send({ code: 'console.log("Hello World")', language: 'javascript' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, jobId: response.body.jobId });
    });

    it('GET /api/v1/result should return pending status', async () => {
        const response = await request(app)
            .get('/api/v1/result').send({ jobId: '7' })

        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, status: 'Success', response: '1\n11\n' });

    })
});

