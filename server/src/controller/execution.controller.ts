import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from 'uuid'
import { client } from '../utils/redis'

interface RequestBody {
    code: string,
    language: string
}

const submitCodeController = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
    const { code, language } = req.body
    const jobId = uuid();
    try {
        await client.lPush("submissions", JSON.stringify({
            jobId,
            code,
            language
        }))
        return next(res.status(200).json({
            success: true,
            jobId
        }))
    } catch (error) {
        console.error('Error submitting code:', error);
        next(error);
    }
};

const checkResultController = (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.body
    //  short polling over db to retrive the response and send to user
    return next()
};


export {
    submitCodeController, checkResultController
}