import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { CreateUserUseCase } from './application/create-user.usecase';
import { GetUserUseCase } from './application/get-user.usecase';
import { UsersController } from './users.controller';
import { IUserRepository } from './domain/user.repository.interface';
import { PrismaUserRepository } from './infra/prisma-user.repository';
import { GetAllUserUseCase } from './application/getAll-user.usecase';
import { RemoveUserUseCase } from './application/remove-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUserUseCase,
    RemoveUserUseCase,
    UpdateUserUseCase,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase, GetUserUseCase, IUserRepository],
})
export class UsersModule {}
