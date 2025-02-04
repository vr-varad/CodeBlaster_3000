const { v4 } = require("uuid")
const { client } = require('../utils/redis')
const { Code } = require("../db/code.model")
const { Code_Response } = require("../db/response.model")
const mongoose = require("mongoose")



const submitCodeController = async (req, res, next) => {
    const { code, language } = req.body
    const jobId = v4();
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await client.lPush("submissions", JSON.stringify({
            jobId,
            code,
            language
        }))
        await Code.create({
            jobId,
            code,
            language
        })
        await session.commitTransaction()
        res.status(200).json({
            success: true,
            jobId
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        await client.lRem("submissions", 0, JSON.stringify({ jobId, code, language }));
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