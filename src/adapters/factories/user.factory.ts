import { UserService } from '@/application/services/user.service';
import { HashService } from '@/infra/services/hashService/hash.service';

const hashService = new HashService();
export const userFactory = new UserService(hashService);
