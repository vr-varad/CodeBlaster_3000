import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from 'uuid'
import { client } from '../utils/redis'
import Code from "../db/code.model";
import Code_Response from "../db/response.model";
import mongoose from "mongoose";

interface RequestBody {
    code: string,
    language: string
}

const submitCodeController = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
    const { code, language } = req.body
    const jobId = uuid();
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
        return next(res.status(200).json({
            success: true,
            jobId
        }))
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        await client.lRem("submissions", 0, JSON.stringify({ jobId, code, language }));
        console.error('Error submitting code:', error);
        next(error);
    }
};

const checkResultController = async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.body
    try {
        const result = await Code_Response.findOne({
            jobId
        })
        if (!result) {
            return next(res.status(404).json({
                success: false,
                status: "Pending"
            }))
        }
        return next(res.status(200).json({
            success: true,
            status: result.status,
            response: result.response
        }))
    } catch (error) {
        console.error('Error submitting code:', error);
        next(error);
    }
};


export {
    submitCodeController, checkResultController
}