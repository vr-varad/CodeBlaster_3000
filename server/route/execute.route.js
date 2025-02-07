import express from 'express';
import { checkResultController, submitCodeController } from '../controller/execution.controller.js';

class Execultor {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route('/submit').post(submitCodeController);
        this.router.route('/result').get(checkResultController);
    }
}

export default new Execultor().router;