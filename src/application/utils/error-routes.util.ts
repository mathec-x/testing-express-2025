import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

export const errorRouterHandler = (req: Request, res: Response, error: any) => {
  let message = error.message;
  if (error instanceof PrismaClientKnownRequestError) {
    const target: string[] = [];
    switch (error.code) {
      case 'P2002':
        if (error.meta && 'target' in error.meta) {
          target.push(error.meta.target as string);
        }
        message = `Unique constraint for [${target.join()}] error`;
        req.logger.error(message, error);
        return res.status(400).json({ message });
      case 'P2025':
        message = 'Record not found';
        req.logger.error(message, error);
        return res.status(404).json({ message });
      default:
        req.logger.error(message, error);
        return res.status(500).json({ message, code: error.code });
    }
  }

  req.logger.error(message, error);
  return res.status(500).json({ message: 'Internal server error' });
};
