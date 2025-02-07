import ExpecutionRouter from './execute.route.js'


class Routes {
    constructor(app) {
        app.use('/api/v1', ExpecutionRouter)
    }
}

export { Routes }