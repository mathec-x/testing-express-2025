import express from 'express';
import { json } from 'body-parser';
import { createServer } from 'http';
import { initRoutes } from './infrastructure/http/routes';
import { errorHandler } from './shared/middlewares/error-handler.middleware';
import { connectToDatabase } from './infrastructure/database/prisma/client';
import { loadEnv } from './shared/config/env';

const app = express();
const server = createServer(app);

// Load environment variables
loadEnv();

// Middleware
app.use(json());

// Connect to the database
connectToDatabase();

// Initialize routes
initRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});