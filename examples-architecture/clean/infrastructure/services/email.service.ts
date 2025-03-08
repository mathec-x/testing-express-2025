import nodemailer from 'nodemailer';
import { EmailService } from '@/domain/interfaces/email-service';

export class EmailServiceImpl implements EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        };

        await this.transporter.sendMail(mailOptions);
    }
}