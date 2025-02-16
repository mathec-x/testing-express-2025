export interface IHashService {
    encryptPassword(password: string): Promise<string>
    isPasswordValid(password: string, hash: string): Promise<boolean>
  }