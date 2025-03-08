import { Context, Next } from 'koa';
import { AuthService } from '../../domain/services/auth-service';

export const authMiddleware = async (ctx: Context, next: Next) => {
    const token = ctx.headers['authorization'];

    if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Authorization token is missing' };
        return;
    }

    try {
        const user = await AuthService.verifyToken(token);
        ctx.state.user = user; // Attach user to the context for later use
        await next(); // Proceed to the next middleware or route handler
    } catch (error) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid or expired token' };
    }
};