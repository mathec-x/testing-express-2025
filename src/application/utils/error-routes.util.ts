import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

export const errorRouterHandler = (req: Request, res: Response, error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const target: string[] = [];
    switch (error.code) {
      case 'P2002':
        if ('target' in error.meta) {
          target.push(error.meta.target as string);
        }
        return res.status(400).json({ message: `Unique constraint for [${target.join()}] error` });
      case 'P2025':
        return res.status(404).json({ message: 'Record not found' });
      default:
        req.logger.error(error.message, error);
        return res.status(500).json({ message: error.message, code: error.code });
    }
  }

  req.logger.error(error.message, error);
  return res.status(500).json({ message: 'Internal server error' });
};
