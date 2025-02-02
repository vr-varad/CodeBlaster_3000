
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};

export default errorHandler;