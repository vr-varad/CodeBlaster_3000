const express = require('express')
const { checkResultController, submitCodeController } = require('../controller/execution.controller');

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


module.exports = new Execultor().router;