import { Application } from 'express'
import ExpecutionRouter from './execute.route'


class Routes{
    constructor(app: Application){
        app.use('/api/v1',ExpecutionRouter)
    }
}

export default Routes