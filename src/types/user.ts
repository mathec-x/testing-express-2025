import { Prisma } from '@prisma/client';

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export const userBasicSelect = {
  id: true,
  uuid: true,
  name: true,
  email: true,
  role: true
};

export type UserBasicSelect = Prisma.UserGetPayload<{ select: typeof userBasicSelect }>;

export const userSingleSelect = {
  id: true,
  uuid: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
};

export type UserSingleSelect = Prisma.UserGetPayload<{ select: typeof userSingleSelect }>;
