import { DataSource } from "typeorm";
import dataSource from "../../config/dataSource";
import Logger from "../logger/logger";

export default class Database {
    private static instance: Database;
    private dataSourceInstance: DataSource;

    private constructor() {
        this.dataSourceInstance = dataSource;
        this.dataSourceInstance.initialize().then(() => {
            Logger.getInstance().info({
                module: 'DATABASE',
                msg: 'Im connected!'
            })
        });
    }

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public getDataSource(): DataSource {
        return this.dataSourceInstance;
    }
}