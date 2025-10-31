import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async byEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async byId(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
