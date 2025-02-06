import { connectDb } from "./utils/db.js";
import redisConnection from "./utils/redis.js";
import { Code_Response } from './model/response.model.js'
import { execShellCommand } from "./utils/execCommand.js";
import { codeRunner } from "./utils/codeRunner.js";
import { Worker } from 'bullmq'

const worker = new Worker('code_submission', async (job) => {
    if (job.name == "code_langauge") {
        try {
            const response = await codeRunner(job.data.language, job.data.code);
            await Code_Response.create({
                jobId: job.id,
                status: "Success",
                response
            })
        } catch (error) {
            await Code_Response.create({
                jobId: job.id,
                status: "Error",
                response: error
            })
        }
    }
}, { connection: redisConnection, autorun: false })

const prePullDockerImages = async () => {
    const images = [
        'python:3.9',
        'node:20'
    ];

    for (const image of images) {
        console.log(`Pulling image: ${image}`);
        await execShellCommand(`docker pull ${image}`);
    }

    console.log('All images pulled successfully!');
};


const main = async () => {
    await connectDb();
    await prePullDockerImages()
    worker.run()
}

main();