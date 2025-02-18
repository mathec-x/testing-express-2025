import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from '@/infra/middlewares/logger.middleware';
import routes from '@/infra/routes';
import prisma from '@/infra/database/database';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(express.static(path.resolve(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.send('Health check ok!!');
});

const swaggerPath = path.resolve(process.cwd(), 'public/swagger.yaml');
console.log('Swagger yaml loaded in', swaggerPath);

const swaggerDocument = YAML.load(swaggerPath);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerUrl: '/swagger.yaml'
  })
);

app.use('/api', routes);

export { app, prisma };
