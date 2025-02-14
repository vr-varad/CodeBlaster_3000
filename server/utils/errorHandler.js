import Logger from "@code_blaster/logger";

const errorHandler = (err, req, res, next) => {
    Logger.error('Error:', err);
    return next(res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    }));
};

export { errorHandler }