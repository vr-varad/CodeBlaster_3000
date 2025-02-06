const redisConnection = require('../utils/redis')
const { Queue } = require("bullmq")
const { Code } = require("../db/code.model")
const { Code_Response } = require("../db/response.model")
const mongoose = require("mongoose")

const submissionsQueue = new Queue("code_submission", {
    connection: redisConnection
})

const submitCodeController = async (req, res, next) => {
    const { code, language } = req.body
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const job = await submissionsQueue.add('code_langauge', {
            code,
            language
        })
        await Code.create({
            jobId: job.id,
            code,
            language
        })
        await session.commitTransaction()
        res.status(200).json({
            success: true,
            jobId: job.id
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error submitting code:', error);
        next(error);
    }
};

const checkResultController = async (req, res, next) => {
    const { jobId } = req.body
    try {
        const result = await Code_Response.findOne({
            jobId
        })
        if (!result) {
            res.status(404).json({
                success: false,
                status: "Pending"
            })
            return;
        }
        res.status(200).json({
            success: true,
            status: result.status,
            response: result.response
        })
    } catch (error) {
        console.error('Error submitting code:', error);
        next(error);
    }
};


module.exports = {
    submitCodeController,
    checkResultController
}