"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const httpsOptions = {
    key: fs.readFileSync(path.resolve('./lib/config/key.pem')),
    cert: fs.readFileSync(path.resolve('./lib/config/cert.pem'))
};
https.createServer(httpsOptions, app_1.default).listen(PORT, () => {
    console.log(`Express server is running on ${PORT} in ${NODE_ENV} mode`);
});
//# sourceMappingURL=server.js.map