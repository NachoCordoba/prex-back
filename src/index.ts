import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config()
import "reflect-metadata";
import dataSource from "./config/dataSource";

dataSource.initialize().then(()=>{
    console.log(`[database]: Connected!`);
});

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express Up!')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})