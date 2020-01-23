import app from './app';
import * as dotenv from 'dotenv';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config()

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';

const httpsOptions = {
  key: fs.readFileSync(path.resolve('./lib/config/key.pem')),
  cert: fs.readFileSync(path.resolve('./lib/config/cert.pem'))
}

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Express server is running on ${PORT} in ${NODE_ENV} mode`);
}) 
