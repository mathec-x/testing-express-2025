import { UserService } from '@/application/services/user.service';
import { HashService } from '@/infra/services/hashService/hash.service';
import { Request } from 'express';

const hashService = new HashService();
export const userFactory = (req: Request) => new UserService(hashService, req.logger);
