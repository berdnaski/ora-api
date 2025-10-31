import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from '../application/get-user.usecase';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';

describe('GetUserUseCase', () => {
  let service: GetUserUseCase;
  const mockUserRepo = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
  };

  const mockUser: User = new User(
    'id-123',
    'Erick',
    'erick@test.com',
    'password',
    new Date(),
    new Date(),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        { provide: IUserRepository, useValue: mockUserRepo },
      ],
    }).compile();

    service = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should find a user by email', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(mockUser);
    const result = await service.byEmail('erick@test.com');
    expect(result).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    mockUserRepo.findById.mockResolvedValue(mockUser);
    const result = await service.byId('id-123');
    expect(result).toEqual(mockUser);
  });
});
