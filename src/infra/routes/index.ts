import { Router } from 'express';
import userRoutes from './user.route';
import { printRoutes } from '@/application/utils/print-routes.util';

const router = Router();
router.use('/users', userRoutes);
printRoutes('/api/users', userRoutes);

export default router;
