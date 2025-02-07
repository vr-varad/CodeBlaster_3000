import ExecutionRouter from './execute.route.js';

class Routes {
    constructor(app) {
        app.use('/api/v1', ExecutionRouter);
    }
}

export { Routes };