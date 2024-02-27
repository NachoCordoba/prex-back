import { DataSource } from "typeorm";
import dataSource from "../../config/dataSource";

export default class Database {
    private static instance: Database;
    private dataSourceInstance: DataSource;

    private constructor() {
        this.dataSourceInstance = dataSource;
        this.dataSourceInstance.initialize().then(() => {
            console.log(`[database]: Connected!`);
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