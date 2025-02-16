import { Request, Response } from 'express';
import { userSchema } from '@/application/validators/user.validator';
import { errorRouterHandler } from '@/application/utils/error-routes.util';
import { userFactory } from '../factories/user.factory';

export const getUser = async (req: Request, res: Response) => {
  try {
    req.logger.info(`Request get user with uuid: ${req.params.uuid}`);
    const user = await userFactory.getUser(req.params.uuid);
    res.json(user);
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    req.logger.info('Request get users');
    const users = await userFactory.getUsers(req.query);
    res.json(users);
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    req.logger.info('Request create user with data', req.body);
    const validation = userSchema.safeParse(req.body);
    if (validation.success) {
      if(req.body.password){
        req.body.password = await userFactory.hashPassword(req.body.password);
      }

      const user = await userFactory.createUser(req.body);
      res.status(201).json(user);
    } else {
      res.status(400).json(validation.error.format());
    }
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    req.logger.info(`Request update user with uuid: ${req.params.uuid}`, req.body);
    const validation = userSchema.partial().safeParse(req.body);
    if (validation.success) {
      const user = await userFactory.updateUser(req.params.uuid, req.body);
      res.json(user);
    } else {
      res.status(400).json(validation.error.format());
    }
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};
