import { RefreshToken } from './refresh-token.entity';
import { User } from './user.entity';

export type UserUpdateData = {
  name?: string;
  password?: string;
}

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract saveRefreshToken(
    userId: string,
    token: string,
  ): Promise<RefreshToken>;
  abstract findRefreshToken(token: string): Promise<RefreshToken | null>;
  abstract findAll(): Promise<User[]>;
  abstract remove(id: string): Promise<void>;
  abstract update(id: string, data: UserUpdateData): Promise<User>;
}
