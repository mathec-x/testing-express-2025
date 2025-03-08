import { Queue, QueueOptions } from 'bull';

const queueOptions: QueueOptions = {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    },
    defaultJobOptions: {
        attempts: 3,
        backoff: 5000,
    },
};

const jobQueue = new Queue('jobQueue', queueOptions);

export default jobQueue;