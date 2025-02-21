import http from 'k6/http';

export const options = {
    scenarios: {
        my_scenario1: {
            executor: 'constant-arrival-rate',
            duration: '30s', // total duration
            preAllocatedVUs: 50, // to allocate runtime resources     preAll

            rate: 50, // number of constant iterations given `timeUnit`
            timeUnit: '1s',
        },
    },
};

export default function () {
    const payload = JSON.stringify({
        language: 'javaScript',
        code: "console.log('Hello, World!');",
    });
    const headers = { 'Content-Type': 'application/json' };
    http.post('http://localhost:3000/api/v1/submit', payload, { headers });
}