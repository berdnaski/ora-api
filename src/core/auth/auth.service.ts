import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../../modules/users/application/create-user.usecase';
import { GetUserUseCase } from '../../modules/users/application/get-user.usecase';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/users/domain/user.entity';
import { RefreshToken } from '../../modules/users/domain/refresh-token.entity';
import { IUserRepository } from 'src/modules/users/domain/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string): Promise<User> {
    const existing = await this.getUserUseCase.byEmail(email);
    if (existing) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.createUserUseCase.execute(name, email, password);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.getUserUseCase.byEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.userRepository.saveRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async refreshToken(token: string) {
    const tokenEntity: RefreshToken | null =
      await this.userRepository.findRefreshToken(token);
    if (!tokenEntity) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.getUserUseCase.byId(tokenEntity.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
