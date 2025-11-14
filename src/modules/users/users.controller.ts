import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetUserUseCase } from './application/get-user.usecase';
import { GetAllUserUseCase } from './application/get-all-user.usecase';
import { RemoveUserUseCase } from './application/remove-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';

import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { OwnerOrAdminGuard } from 'src/shared/decorators/owner-or-admin-guard';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@ApiTags("Users")
@ApiBearerAuth("access-token")
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
  @ApiOperation({ summary: "Buscar usuário pelo ID" })
  @ApiResponse({ status: 200, description: "Usuário encontrado", type: UserResponseDto })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.byId(id);
    return new UserResponseDto(user);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async getAll() {
    const users = await this.getAllUserUseCase.getAll();
    return users.map((u) => new UserResponseDto(u));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new OwnerOrAdminGuard('id'))
  @ApiOperation({ summary: "Remover usuário pelo ID" })
  @ApiResponse({ status: 204, description: "Usuário removido com sucesso" })
  async remove(@Param('id') id: string) {
    return this.removeUserUseCase.remove(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new OwnerOrAdminGuard('id'))
  @ApiOperation({ summary: "Atualizar usuário" })
  @ApiResponse({ status: 200, description: "Usuário atualizado", type: UserResponseDto })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, data);
    return new UserResponseDto(user);
  }
}
