export class AuthService {
    constructor(private userRepository: UserRepository, private emailService: EmailService) {}

    async register(name: string, email: string, password: string): Promise<User> {
        const user = new User(name, email, password);
        await this.userRepository.save(user);
        await this.emailService.sendWelcomeEmail(user);
        return user;
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && user.validatePassword(password)) {
            return user;
        }
        return null;
    }
}