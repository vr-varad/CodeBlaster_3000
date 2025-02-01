import express, { Application } from 'express'
import Routes from '../route';

class Express {
    static app: Application = express();
    static PORT = process.env.PORT || 3000

    static init() {
        this.app.use(express.json());
        new Routes(this.app)
        this.app.listen(this.PORT, () => {
            console.log("The Server is Running on Port: ", this.PORT)
        })
    }
}

export default Express