import { Database } from './Database.js';
import { Express } from './Express.js';


class App {
    static loadServer() {
        Express.init();
    }

    static loadDatabase() {
        Database.init();
    }

    static startServer() {
        Express.startServer();
    }
}

export { App }