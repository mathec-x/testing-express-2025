import { Router } from 'express';
import { createUser, updateUser, getUsers, getUser } from '@/adapters/controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:uuid', updateUser);
router.get('/:uuid', getUser);

export default router;
