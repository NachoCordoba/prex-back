import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';

dotenv.config()
let dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    migrationsRun: true
}

if(!process.env.NODE_ENV){
    dataSourceOptions = {
        ...dataSourceOptions,
        logging: false,
        entities: ['dist/modules/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/**/*{.ts,.js}'],
    }
}

export default new DataSource(dataSourceOptions)