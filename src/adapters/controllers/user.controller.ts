import { Request, Response } from 'express';
import { userSchema } from '@/application/validators/user.validator';
import { errorRouterHandler } from '@/application/utils/error-routes.util';
import { userFactory } from '../factories/user.factory';

export const getUser = async (req: Request<{ uuid: string }, any, any>, res: Response) => {
  try {
    req.logger.info(`Request get user with uuid: ${req.params.uuid}`);
    const user = await userFactory(req).getUser(req.params.uuid);
    req.logger.info('User found', user);
    res.status(200).json(user);
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    req.logger.info(`Filter users with query '${req.query.name}'`);
    const users = await userFactory(req).getUsers(req.query);
    req.logger.info(`Users found ${users.length}`, users);
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
      if (validation.data.password) {
        validation.data.password = await userFactory(req).hashPassword(validation.data.password);
      }
      const user = await userFactory(req).createUser(validation.data);
      req.logger.info('User created successfully', user);
      res.status(201).json(user);
    } else {
      req.logger.error(
        `Validation error ${validation.error.errors.map((err) => err.path).join()}`,
        validation.error.format()
      );
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
      if (validation.data.password) {
        validation.data.password = await userFactory(req).hashPassword(validation.data.password);
      }
      const user = await userFactory(req).updateUser(req.params.uuid, validation.data);
      req.logger.info('User updated successfully', user);
      res.json(user);
    } else {
      req.logger.error(
        `Validation error ${validation.error.errors.map((err) => err.path).join()}`,
        validation.error.format()
      );
      res.status(400).json(validation.error.format());
    }
  } catch (error) {
    errorRouterHandler(req, res, error);
  }
};
