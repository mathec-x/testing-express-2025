import { env } from './infra/config/env.config';
import { logger } from './infra/config/logger.config';
import { app } from './infra/server';

app.listen(env.PORT, () => {
  log.info(`Server running on port ${env.PORT}`);
});

const log = logger(app.name);
