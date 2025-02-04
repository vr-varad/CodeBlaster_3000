import { createClient } from 'redis'
const client = createClient({
    url: "redis://127.0.0.1:6379"
})

client.on("error", (err) => {
    console.log("Error: ", err)
})


export {
    client
}