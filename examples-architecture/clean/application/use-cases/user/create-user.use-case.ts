export class CreateUserUseCase {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(name: string, email: string): Promise<User> {
        const userEmail = new Email(email);
        const user = new User(crypto.randomUUID(), name, userEmail);
        await this.userRepository.save(user);
        return user;
    }
}