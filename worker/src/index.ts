import { client } from "./utils/redis";


const main = async () => {
    await client.connect()
    while (true) {
        try {
            const submission = await client.brPop("submissions", 0);
            console.log(submission);
        } catch (error) {
            console.log(error);
        }
    }
}

main();