import { connectDb } from "./utils/db.js";
import { client } from "./utils/redis.js";
import { Code_Response } from './model/response.model.js'
import { execShellCommand } from "./utils/execCommand.js";

const prePullDockerImages = async () => {
    const images = [
        'python:3.9',
    ];

    for (const image of images) {
        console.log(`Pulling image: ${image}`);
        await execShellCommand(`docker pull ${image}`);
    }

    console.log('All images pulled successfully!');
};


const main = async () => {
    await client.connect()
    await connectDb();
    await prePullDockerImages()
    while (true) {
        try {
            const submission = await client.brPop("submissions", 0);
            const {
                jobId,
                code,
                language
            } = JSON.parse(submission.element);


            // will do some computation to get the response and status
            setTimeout(() => {
                Code_Response.create({
                    jobId,
                    status: "DONE",
                    response: "hello"
                })
            }, 10000);


        } catch (error) {
            console.log(error);
        }
    }
}



main();