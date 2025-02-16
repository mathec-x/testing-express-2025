import { logger } from '@/infra/config/logger.config';
import { Router } from 'express';

export const printRoutes = (path: string, router: Router) => {
  router.stack.forEach((r: any) => {
    const log = logger(r.route.stack[0].name);
    const routeMethod = `${r.route.stack[0].method.toUpperCase()}`;
    log.debug(`  \t${routeMethod.padEnd(5)} ${path + r.route.path}`);
  });
};
