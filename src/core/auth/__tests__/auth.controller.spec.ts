import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { User } from '../../../modules/users/domain/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser: User = new User(
    'id-123',
    'Erick',
    'erick@test.com',
    'hashed-password',
    new Date(),
    new Date(),
  );

  const mockAuthService = {
    register: jest.fn().mockResolvedValue(mockUser),
    validateUser: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockResolvedValue({ access_token: 'jwt', refresh_token: 'jwt-refresh' }),
    refreshToken: jest.fn().mockResolvedValue({ access_token: 'jwt' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register and return user with tokens', async () => {
    const result = await controller.register({
      name: 'Erick',
      email: 'erick@test.com',
      password: '123456',
    });
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      access_token: 'jwt',
      refresh_token: 'jwt-refresh',
    });
  });

  it('should login and return tokens', async () => {
    const result = await controller.login({
      email: 'erick@test.com',
      password: '123456',
    });
    expect(result).toEqual({ access_token: 'jwt', refresh_token: 'jwt-refresh' });
  });
});
