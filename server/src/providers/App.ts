import Database from './Database';
import Express from './Express'


class App {
    static loadServer() {
        Express.init();
    }

    static loadDatabase(){
        Database.init();
    }
}

export default App