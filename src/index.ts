import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import bodyParser from 'body-parser';
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.listen(port, () => console.log(`Running on port ${port}`));