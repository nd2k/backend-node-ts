"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes_1 = require("./routes/routes");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.routePrivate = new routes_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/users';
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrivate.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(morgan('combined'));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
            console.log('Connection successful...');
        }, (error) => {
            console.error('connection failed', error);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map