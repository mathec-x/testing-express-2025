import { UserRoles } from '@/types/user';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([UserRoles.ADMIN, UserRoles.USER])
});
