import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "user@email.com",
    description: "E-mail cadastrado do usuário"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Senha do usuário"
  })
  @IsString()
  @MinLength(6)
  password: string;
}
