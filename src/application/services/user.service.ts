import { IHashService } from '@/domain/services/hashService/IHashService';
import { IUserService } from '@/domain/services/userService/IUserService';
import { logger } from '@/infra/config/logger.config';
import { prisma } from '@/infra/database/database';
import { userBasicSelect, UserBasicSelect, userSingleSelect, UserSingleSelect } from '@/types/user';
import { Prisma } from '@prisma/client';

export class UserService implements IUserService {
  private readonly logger = logger(UserService.name);

  constructor(
    private readonly hashService: IHashService
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<UserSingleSelect> {
    this.logger.info('Creating user with data', data);
    return await prisma.user.create({
      select: userSingleSelect,
      data
    });
  }

  async updateUser(uuid: string, data: Prisma.UserUpdateInput): Promise<UserSingleSelect> {
    this.logger.info(`Updating user with uuid: ${uuid}`, data);
    return await prisma.user.update({
      select: userSingleSelect,
      where: { uuid },
      data
    });
  }

  async getUsers(query: any): Promise<UserBasicSelect[]> {
    this.logger.info('Getting users with query', query);
    return await prisma.user.findMany({
      select: userBasicSelect,
      where: {
        name: {
          contains: query.name || ''
        }
      }
    });
  }

  async getUser(uuid: string): Promise<UserSingleSelect> {
    this.logger.info(`Getting user with uuid: ${uuid}`);
    return await prisma.user.findFirstOrThrow({
      select: userSingleSelect,
      where: { uuid }
    });
  }

  async hashPassword(password: string): Promise<string> {
    this.logger.debug('Hashing user password', password);
    return this.hashService.encryptPassword(password);
  }
}
