import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';

class App {

  public app: express.Application;
  public routePrivate: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost:27017/users';

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routePrivate.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());
    this.app.use(morgan('combined'));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    })
    .then(() => {
      console.log('Connection successful...');
    },
      (error: any) => {
      console.error('connection failed', error);
    });
  }
}

export default new App().app;