import * as bcrypt from 'bcrypt';

export class CryptoService {
  static async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  static async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
