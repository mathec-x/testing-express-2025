import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/domain/interfaces/user-repository";
import { User } from "@/domain/entities/user";

export class PrismaUserRepository implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findById(id: string): Promise<User | null> {
        const userData = await this.prisma.user.findUnique({ where: { id } });
        return userData ? new User(userData.id, userData.name, userData.email) : null;
    }

    async save(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}