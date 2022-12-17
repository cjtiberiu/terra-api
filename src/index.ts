import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
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