import bodyParser from "body-parser";
import express, { Express, Router } from "express";
import Logger from "../logger/logger";

export default class Server {
    private static instance: Server;
    private app: Express;
    private port: number = Number(process.env.PORT);

    private constructor() {
        this.app = express();
    }

    public static getInstance(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }

    public listen(){
        this.app.listen(this.port, () => {
            Logger.getInstance().info({
                module: 'SERVER',
                msg: `Im running at port ${this.port}`
            })
        })
        return this;
    }

    public applyRoutes(routes: Router){
        this.app.use(routes);
        return this;
    }



    public configure(){
        this.app.use(bodyParser.json());
        return this;
    }
}