import { createClient } from 'redis'

const client: any = createClient({
    url: "redis://redis:6379"
})

client.on("error", (err: Error) => {
    console.log("Error: ", err)
})


export { client }