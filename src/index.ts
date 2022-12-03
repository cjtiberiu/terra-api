import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use("/", routes);

app.listen(port, () => console.log(`Running on port ${port}`));
