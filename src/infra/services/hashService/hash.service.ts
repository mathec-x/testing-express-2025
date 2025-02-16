import { IHashService } from '@/domain/services/hashService/IHashService';
import { hash, compare } from 'bcrypt';

export class HashService implements IHashService {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }
  async isPasswordValid(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
