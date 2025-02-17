import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from '@/infra/middlewares/logger.middleware';
import routes from '@/infra/routes';
import prisma from '@/infra/database/database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use('/api', routes);

export { app, prisma };
