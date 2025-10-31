import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { GetUserUseCase } from '../application/get-user.usecase';
import { User } from '../domain/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let useCase: GetUserUseCase;

  const mockUser: User = new User(
    'id-123',
    'Erick',
    'erick@test.com',
    'password',
    new Date(),
    new Date(),
  );

  const mockUseCase = {
    byId: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: GetUserUseCase, useValue: mockUseCase }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    useCase = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should get a user by id', async () => {
    const result = await controller.getUser('id-123');
    expect(result).toEqual(mockUser);
    expect(mockUseCase.byId).toHaveBeenCalledWith('id-123');
  });
});
