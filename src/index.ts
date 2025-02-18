import { env } from './infra/config/env.config';
import { logger } from './infra/config/logger.config';
import { app } from './infra/server';

const log = logger(app.name);
log.info(`Starting server in ${env.NODE_ENV} mode`);
app.listen(env.PORT, () => {
  log.info(`Server running on port ${env.PORT}`);
});
