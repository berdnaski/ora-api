import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
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
    const created = await this.prisma.refreshToken.create({
      data: {
        userId,
        token,
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
}
