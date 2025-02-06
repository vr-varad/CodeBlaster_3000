import { connectDb } from "./utils/db.js";
import { client } from "./utils/redis.js";
import { Code_Response } from './model/response.model.js'
import { execShellCommand } from "./utils/execCommand.js";
import { codeRunner } from "./utils/codeRunner.js";

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


            const response = await codeRunner(language, code);

            console.log(response)

        } catch (error) {
            console.log(error);
        }
    }
}



main();