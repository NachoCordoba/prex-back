import { DataSource } from "typeorm";

export default new DataSource({
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
})