import { config } from 'dotenv';

config();

const ENV = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || '',
    REDIS_URL: process.env.REDIS_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY || '',
};

export default ENV;