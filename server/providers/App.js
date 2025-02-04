const { Database } = require('./Database');
const { Express } = require('./Express');


class App {
    static loadServer() {
        Express.init();
    }

    static loadDatabase() {
        Database.init();
    }
}

module.exports = { App }