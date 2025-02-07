import { App } from "./providers/App.js"

App.loadServer();
App.loadDatabase();
if (process.env.NODE_ENV !== 'test') {
    App.startServer();
}