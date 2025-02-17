import Logger from "@code_blaster/logger";
import { CustomError } from '@code_blaster/error-handler'

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError){
        Logger.error(err.message);
        return res.status(err.statusCode).json({ message: err.message });
    }
    Logger.error(err);
    return res.status(500).json({ message: 'Internal server error' });
};

export { errorHandler }