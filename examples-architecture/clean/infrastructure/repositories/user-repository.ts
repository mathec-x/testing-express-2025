import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/interfaces/user-repository";

export class UserRepositoryImpl implements UserRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async save(user: User): Promise<void> {
        const existingUserIndex = this.users.findIndex(u => u.id === user.id);
        if (existingUserIndex > -1) {
            this.users[existingUserIndex] = user; // Update existing user
        } else {
            this.users.push(user); // Add new user
        }
    }

    // Additional methods can be implemented as needed
}