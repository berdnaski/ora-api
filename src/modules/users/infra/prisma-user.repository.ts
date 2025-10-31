import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { User } from '../domain/user.entity';
import { IUserRepository, UserUpdateData } from '../domain/user.repository.interface';
import { RefreshToken } from '../domain/refresh-token.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return new User(
      created.id,
      created.name,
      created.email,
      created.password,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async saveRefreshToken(userId: string, token: string): Promise<RefreshToken> {
    const created = await this.prisma.refreshToken.upsert({
      where: { 
        userId: userId 
      },
      update: {
        token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date() 
      },
      create: {
        userId: userId,
        token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return {
      id: created.id,
      token: created.token,
      userId: created.userId,
      createdAt: created.createdAt,
      expiresAt: created.expiresAt,
    };
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const found = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!found) return null;
    return {
      id: found.id,
      token: found.token,
      userId: found.userId,
      createdAt: found.createdAt,
      expiresAt: found.expiresAt,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async update(id: string, data: UserUpdateData): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      }
    });
    
    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.createdAt,
      updated.updatedAt,
    );
  }
}
