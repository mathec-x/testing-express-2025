import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { UserController } from './adapters/controllers/user.controller';
import { PrismaUserRepository } from './adapters/persistence/prisma-user.repository';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './core/use-cases/update-user.use-case';
import { PrismaClient } from '@prisma/client';

const app = new Koa();
const prisma = new PrismaClient();

// Initialize repositories and use cases
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

// Initialize controllers
const userController = new UserController(createUserUseCase, updateUserUseCase);

// Middleware
app.use(bodyParser());

// Routes
app.use(async (ctx, next) => {
    if (ctx.path === '/users' && ctx.method === 'POST') {
        await userController.create(ctx);
    } else if (ctx.path === '/users' && ctx.method === 'PUT') {
        await userController.update(ctx);
    } else {
        await next();
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});