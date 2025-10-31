import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { CreateUserUseCase } from './application/create-user.usecase';
import { GetUserUseCase } from './application/get-user.usecase';
import { UsersController } from './users.controller';
import { IUserRepository } from './domain/user.repository.interface';
import { PrismaUserRepository } from './infra/prisma-user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase, GetUserUseCase, IUserRepository],
})
export class UsersModule {}
