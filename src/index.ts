import dotenv from 'dotenv';
import Server from './lib/server/server';
import Database from './lib/database/database';
import authRoutes from './modules/auth/auth.routes';
dotenv.config();

Database
    .getInstance()
    .getDataSource()
    .initialize();

Server
    .getInstance()
    .configure()
    .applyRoutes(authRoutes)
    .listen();
