declare namespace Express {
  export interface Request {
    logger: ReturnType<typeof import('@/infra/config/logger.config').logger>;
    correlationId: string;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'test' | 'development' | 'production';
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}
