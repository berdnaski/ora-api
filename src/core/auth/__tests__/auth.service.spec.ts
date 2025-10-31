import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { CreateUserUseCase } from '../../../modules/users/application/create-user.usecase';
import { GetUserUseCase } from '../../../modules/users/application/get-user.usecase';
import { IUserRepository } from '../../../modules/users/domain/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../modules/users/domain/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: IUserRepository;

  const mockUser: User = new User(
    'id-123',
    'Erick',
    'erick@test.com',
    'hashed-password',
    new Date(),
    new Date(),
  );

  const mockUserRepo = {
    saveRefreshToken: jest.fn(),
    findRefreshToken: jest.fn(),
  };

  const mockGetUserUseCase = {
    byEmail: jest.fn(),
    byId: jest.fn(),
  };

  const mockCreateUserUseCase = {
    execute: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
        { provide: GetUserUseCase, useValue: mockGetUserUseCase },
        { provide: IUserRepository, useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<IUserRepository>(IUserRepository);
  });

  it('should register a user', async () => {
    mockGetUserUseCase.byEmail.mockResolvedValue(null);
    mockCreateUserUseCase.execute.mockResolvedValue(mockUser);

    const result = await service.register('Erick', 'erick@test.com', '123456');

    expect(result).toEqual(mockUser);
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(
      'Erick',
      'erick@test.com',
      '123456',
    );
  });

  it('should login a user and return tokens', async () => {
    const result = await service.login(mockUser);
    expect(result).toEqual({ access_token: 'jwt-token', refresh_token: 'jwt-token' });
    expect(mockUserRepo.saveRefreshToken).toHaveBeenCalled();
  });
});
