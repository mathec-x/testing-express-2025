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
        res.status(400).json({ message: `Unique constraint for [${target.join()}] error` });
        break;
      case 'P2025':
        res.status(404).json({ message: 'Record not found' });
        break;
      default:
        req.logger.error(error.message, error);
        res.status(500).json({ message: error.message, code: error.code });
        break;
    }
  } else {
    req.logger.error(error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
