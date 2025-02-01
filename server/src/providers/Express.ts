import express, { Application } from 'express'
import Routes from '../route';
import { client } from '../utils/redis';

class Express {
    static app: Application = express();
    static PORT = process.env.PORT || 3000

    static async init() {
        this.app.use(express.json());
        new Routes(this.app)
        await client.connect();
        this.app.listen(this.PORT, () => {
            console.log("The Server is Running on Port: ", this.PORT)
        })
    }
}

export default Express