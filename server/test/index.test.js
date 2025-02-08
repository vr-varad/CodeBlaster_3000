import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../providers/Express.js';
import { Database } from '../providers/Database.js';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

describe('API Tests', () => {
    let code_response;
    let result_response;

    beforeAll(async () => {
        await Database.init();
    });

    it('POST /api/v1/submit should submit code successfully', async () => {

        code_response = await request(app)
            .post('/api/v1/submit').send({ code: 'console.log("Hello World")', language: 'javascript' });

        expect(code_response.status).toBe(200);
        expect(code_response.body).toEqual({ success: true, jobId: code_response.body.jobId });
    });

    it('GET /api/v1/result should return pending status', async () => {
        await wait(1000)
        result_response = await request(app)
            .get('/api/v1/result').send({ jobId: code_response.body.jobId });

        expect(result_response.status).toBe(200);
        expect(result_response.body).toEqual({ success: true, status: 'Success', response: 'Hello World\n' });

    })
});

