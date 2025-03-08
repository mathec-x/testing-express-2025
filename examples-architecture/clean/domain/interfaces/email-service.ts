export interface EmailService {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
    sendBulkEmail(recipients: string[], subject: string, body: string): Promise<void>;
}