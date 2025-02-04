const { createClient } = require('redis')

const client = createClient({
    url: "redis://redis:6379"
})

client.on("error", (err) => {
    console.log("Error: ", err)
})


module.exports = {
    client
}