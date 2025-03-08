export class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(id: string, newEmail: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        user.changeEmail(newEmail);
        await this.userRepository.save(user);
        return user;
    }
}