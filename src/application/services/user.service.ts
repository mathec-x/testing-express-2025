import { prisma } from '@/infra/database/database';
import { userBasicSelect, UserBasicSelect, userSingleSelect, UserSingleSelect } from '@/types/user';
import { Prisma } from '@prisma/client';

export class UserService {
  static async createUser(data: Prisma.UserCreateInput): Promise<UserSingleSelect> {
    return await prisma.user.create({
      select: userSingleSelect,
      data
    });
  }

  static async updateUser(uuid: string, data: Prisma.UserUpdateInput): Promise<UserSingleSelect> {
    return await prisma.user.update({
      select: userSingleSelect,
      where: { uuid },
      data
    });
  }

  static async getUsers(query: any): Promise<UserBasicSelect[]> {
    return await prisma.user.findMany({
      select: userBasicSelect,
      where: {
        name: {
          contains: query.name || ''
        }
      }
    });
  }

  static async getUser(uuid: string): Promise<UserSingleSelect> {
    return await prisma.user.findFirstOrThrow({
      select: userSingleSelect,
      where: { uuid }
    });
  }
}
