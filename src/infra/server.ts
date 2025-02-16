import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from '@/infra/middlewares/logger.middleware';
import { prisma } from '@/infra/database/database';
import routes from '@/infra/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use('/api', routes);

export { app, prisma };
