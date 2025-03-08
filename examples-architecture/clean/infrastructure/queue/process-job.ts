import { Job } from 'bull';
import { UserService } from '../../domain/services/user-service';
import { NotificationService } from '../../application/services/notification.service';

export const processJob = async (job: Job) => {
    const { userId, action } = job.data;

    try {
        const userService = new UserService();
        const notificationService = new NotificationService();

        switch (action) {
            case 'sendWelcomeEmail':
                await notificationService.sendWelcomeEmail(userId);
                break;
            case 'sendPasswordReset':
                await notificationService.sendPasswordReset(userId);
                break;
            default:
                throw new Error('Unknown action');
        }
    } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
        throw error;
    }
};