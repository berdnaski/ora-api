import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: "Novo Nome",
    description: "Novo nome do usuário"
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "novaSenha123",
    description: "Nova senha do usuário"
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
