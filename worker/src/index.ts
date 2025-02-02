import connectDb from "./utils/db";
import { client } from "./utils/redis";
import Code_Response from "./model/response.model";



const main = async () => {
    await client.connect()
    connectDb();
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