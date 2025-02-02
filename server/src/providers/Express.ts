import express, { Application } from 'express'
import Routes from '../route';
import { client } from '../utils/redis';
import errorHandler from '../utils/errorHandler';

class Express {
    static app: Application = express();
    static PORT = process.env.PORT || 3000

    static async init() {
        this.app.use(express.json());
        new Routes(this.app)
        this.app.use(errorHandler);
        await client.connect();
        this.app.listen(this.PORT, () => {
            console.log("The Server is Running on Port: ", this.PORT)
        })
    }
}

export default Express