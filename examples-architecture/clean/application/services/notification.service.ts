import { EmailService } from '../../domain/interfaces/email-service';
import { UserDTO } from '../dto/user-dto';

export class NotificationService {
    constructor(private emailService: EmailService) {}

    async sendWelcomeEmail(user: UserDTO): Promise<void> {
        const subject = 'Welcome to Our Service!';
        const body = `Hello ${user.name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`;
        await this.emailService.sendEmail(user.email, subject, body);
    }

    async sendPasswordResetEmail(user: UserDTO, resetLink: string): Promise<void> {
        const subject = 'Password Reset Request';
        const body = `Hello ${user.name},\n\nWe received a request to reset your password. You can reset it using the following link:\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team`;
        await this.emailService.sendEmail(user.email, subject, body);
    }
}