import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { GetUserUseCase } from './application/get-user.usecase';
import { User } from './domain/user.entity';
import { GetAllUserUseCase } from './application/getAll-user.usecase';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { RemoveUserUseCase } from './application/remove-user.usecase';
import { OwnerOrAdminGuard } from 'src/shared/decorators/owner-or-admin-guard';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.getUserUseCase.byId(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUserUseCase.getAll();
    return users.map(user => new UserResponseDto(user));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new OwnerOrAdminGuard('id'))
  async remove(@Param('id') id: string) {
    return this.removeUserUseCase.remove(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new OwnerOrAdminGuard('id'))
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, data);
    return new UserResponseDto(user);
  }
}
