import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import bodyParser from 'body-parser';
const cors = require('cors');
const { exec } = require('child_process');

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
  .then(async () => {
    try {
      const adminUser = await db.users.findOne({ where: { id: 1 } }); // Adjust the query according to how you identify an admin

      if (!adminUser) {
        console.log('Admin user does not exist, seeding database...');
        exec('npx sequelize-cli db:seed:all', (error: any, stdout: any, stderr: any) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });
      } else {
        console.log('Admin user already exists, skipping seeding.');
      }
    } catch (error) {
      console.error(`Error checking admin user existence: ${error}`);
    }
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.listen(port, () => console.log(`Running on port ${port}`));