import dotenv from 'dotenv';
import Server from './lib/server/server';
import Database from './lib/database/database';
import authRoutes from './modules/auth/auth.routes';
import attachmentRoute from './modules/attachment/attachment.routes';
import doc from './doc/doc';

dotenv.config();

Database
    .getInstance()
    .getDataSource()
    .initialize();

Server
    .getInstance()
    .configure()
    .applyRoutes(authRoutes)
    .applyRoutes(attachmentRoute)
    .applyRoutes(doc)
    .listen();
