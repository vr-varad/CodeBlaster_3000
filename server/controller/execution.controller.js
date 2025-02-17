import redisConnection from "../utils/redis.js"
import { Queue } from "bullmq"
import { Code } from "../db/code.model.js"
import {Code_Response} from "../db/response.model.js"
import mongoose from 'mongoose';
import Logger from "@code_blaster/logger";
import { BadRequestError } from "@code_blaster/error-handler";


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
        Logger.error('Error submitting code:', error);
        return next(new BadRequestError('Error submitting code'));
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
        Logger.error('Error submitting code:', error);
        return next(new BadRequestError('Error Checking Result'));
    }
};


export { submitCodeController, checkResultController }