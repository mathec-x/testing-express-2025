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

const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'public/swagger.yaml'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerUrl: '/swagger.yaml'
  })
);

app.get('/', (req, res) => {
  res.send('Health check ok!!');
});

app.use('/api', routes);

export { app, prisma };
