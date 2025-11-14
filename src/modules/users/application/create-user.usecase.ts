import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { CryptoService } from '../domain/crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await CryptoService.hash(password);

    const user = new User(
      '', 
      name,
      email,
      hashedPassword,
      null,       
      null,         
      new Date(),
      new Date(),
    );

    return this.userRepository.create(user);
  }
}
