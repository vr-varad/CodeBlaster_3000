const mongoose = require("mongoose");

const code_schema = new mongoose.Schema({
    code: String,
    language: String,
    jobId: String
})

const Code = mongoose.model('code', code_schema);

module.exports = { Code }