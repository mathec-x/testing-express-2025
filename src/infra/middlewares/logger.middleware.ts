import { Request, NextFunction } from 'express';
import { logger } from '@/infra/config/logger.config';
import { randomUUID as uuidv4 } from 'crypto';

export const loggerMiddleware = (req: Request, _: any, next: NextFunction) => {
  req.correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();
  req.logger = logger('router').child({
    correlationId: req.correlationId
  });
  req.logger.info(`Incoming request: ${req.method} ${req.url}`, {
    correlationId: req.correlationId
  });
  next();
};
