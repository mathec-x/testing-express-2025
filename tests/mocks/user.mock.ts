/* istanbul ignore file */
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const mockUser = (size = 3) => {
  const users: User[] = [];

  for (let i = 0; i < size; i++) {
    users.push({
      id: i + 1,
      uuid: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['ADMIN', 'USER']),
      password: faker.internet.password(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
      deletedAt: faker.helpers.arrayElement([null, faker.date.recent()])
    });
  }

  return users;
};
