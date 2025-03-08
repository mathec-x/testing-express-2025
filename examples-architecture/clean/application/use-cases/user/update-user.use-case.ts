export class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(id: string, name?: string, email?: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.changeEmail(email);
        }

        await this.userRepository.save(user);
        return user;
    }
}