const ExpecutionRouter = require('./execute.route');


class Routes{
    constructor(app){
        app.use('/api/v1',ExpecutionRouter)
    }
}

module.exports = {
    Routes
}