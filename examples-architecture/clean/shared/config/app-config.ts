import { config } from 'dotenv';

config();

const appConfig = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    emailService: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        user: process.env.EMAIL_USER || 'your_email@example.com',
        pass: process.env.EMAIL_PASS || 'your_email_password',
    },
    // Add other configuration settings as needed
};

export default appConfig;