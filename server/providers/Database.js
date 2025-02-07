import mongoose from "mongoose"

class Database {
    static init() {
        mongoose.connect("mongodb://mongo:27017/", {
            dbName: "code_blaster_3000"
        }).then(() => {
            console.log("Database Connected")
        })
    }
}

export { Database }