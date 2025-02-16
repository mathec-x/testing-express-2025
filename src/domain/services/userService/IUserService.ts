import { UserBasicSelect, UserSingleSelect } from '@/types/user';
import { Prisma } from '@prisma/client';

export interface IUserService {
  createUser(user: Prisma.UserCreateInput): Promise<UserSingleSelect>;
  updateUser(id: string, user: Prisma.UserUpdateInput): Promise<UserSingleSelect>;
  getUsers(query: any): Promise<UserBasicSelect[]>;
  getUser(id: string): Promise<UserSingleSelect>;
  hashPassword(password: string): Promise<string>;
}
