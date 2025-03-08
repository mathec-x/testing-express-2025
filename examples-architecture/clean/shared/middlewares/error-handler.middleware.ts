import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandlerMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};