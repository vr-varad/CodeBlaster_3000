import mongoose from "mongoose";

const code_response_schema = new mongoose.Schema({
    jobId: String,
    status: String,
    response: String,
})

const Code_Response = mongoose.model('code_response', code_response_schema);

export default Code_Response;