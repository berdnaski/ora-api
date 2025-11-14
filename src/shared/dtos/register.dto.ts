import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: "João Silva",
    description: "Nome completo do usuário"
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "joao@email.com",
    description: "E-mail único do usuário"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Senha com mínimo de 6 caracteres"
  })
  @IsString()
  @MinLength(6)
  password: string;
}
