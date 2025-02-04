import mongoose from "mongoose"


const connectDb = () => {
    mongoose.connect("mongodb://localhost:27017/", {
        dbName: "code_blaster_3000"
    }).then(() => {
        console.log("Database Connected")
    })
}

export {
    connectDb
}