import supertest from 'supertest';
import { app, prisma } from '@/infra/server';
import { mockUser } from './mocks/user.mock';

describe('[E2E] Get users', () => {
  let request: any;

  beforeEach(async () => {
    await prisma.$transaction([prisma.user.deleteMany()]);
    request = supertest(app);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should list all users', async () => {
    const users = mockUser(3);
    await prisma.user.createMany({ data: users });

    const response = await request.get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    for (const user of response.body) {
      const expectedUser = users.find((u) => u.id === user.id);
      expect(user.name).toEqual(expectedUser?.name);
      expect(user.email).toEqual(expectedUser?.email);
    }
  });

  it('should filter by user name', async () => {
    const users = mockUser(10);
    await prisma.user.createMany({ data: users });

    const response = await request.get('/api/users').query({ name: users[0].name.slice(0, 5) });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toEqual(users[0].name);
  });

  it('should create user', async () => {
    const [user] = mockUser(1);
    const response = await request.post('/api/users').send(user);

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(user.name);
    expect(response.body.email).toEqual(user.email);
  });

  it('should not create user with invalid data', async () => {
    const [user] = mockUser(1);
    const response = await request.post('/api/users').send({ ...user, email: 'invalid-email' });

    expect(response.status).toBe(400);
  });

  it('should update user', async () => {
    const [user] = mockUser(1);
    const createdUser = await prisma.user.create({ data: user });
    const response = await request.put(`/api/users/${createdUser.uuid}`).send({ name: 'new name' });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('new name');
  });

  it('should not update user with invalid data', async () => {
    const [user] = mockUser(1);
    const createdUser = await prisma.user.create({ data: user });
    const response = await request.put(`/api/users/${createdUser.uuid}`).send({ email: 'invalid-email' });

    expect(response.status).toBe(400);
  });

  it('should get user by uuid', async () => {
    const [user] = mockUser(1);
    const createdUser = await prisma.user.create({ data: user });
    const response = await request.get(`/api/users/${createdUser.uuid}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(user.name);
    expect(response.body.email).toEqual(user.email);
  });

  it('should not get user by invalid uuid', async () => {
    const response = await request.get(`/api/users/invalid-uuid`);

    expect(response.status).toBe(404);
  });
});
