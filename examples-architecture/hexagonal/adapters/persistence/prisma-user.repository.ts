export class PrismaUserRepository implements UserRepositoryPort {
    constructor(private prisma: PrismaClient) {}

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? new User(user.id, user.name, user.email) : null;
    }

    async save(user: User): Promise<void> {
        await this.prisma.user.create({ data: { id: user.id, name: user.name, email: user.email } });
    }

    async updateEmail(id: string, newEmail: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { email: newEmail },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}