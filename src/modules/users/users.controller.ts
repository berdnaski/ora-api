import { Controller, Get, Param } from '@nestjs/common';
import { GetUserUseCase } from './application/get-user.usecase';
import { User } from './domain/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.getUserUseCase.byId(id);
  }
}
