import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { User } from '../domain/user.entity';
import {
  IUserRepository,
  UserUpdateData,
} from '../domain/user.repository.interface';
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
        photo: user.photo,
        churchId: user.churchId,
      },
    });

    return new User(
      created.id,
      created.name,
      created.email,
      created.password,
      created.photo,
      created.churchId,
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
      user.photo,
      user.churchId,
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
      user.photo,
      user.churchId,
      user.createdAt,
      user.updatedAt,
    );
  }

  async saveRefreshToken(userId: string, token: string): Promise<RefreshToken> {
    const created = await this.prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return new RefreshToken(
      created.id,
      created.token,
      created.userId,
      created.createdAt,
      created.expiresAt,
    );
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const found = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!found) return null;

    return new RefreshToken(
      found.id,
      found.token,
      found.userId,
      found.createdAt,
      found.expiresAt,
    );
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
          user.photo,
          user.churchId,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, data: UserUpdateData): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.photo,
      updated.churchId,
      updated.createdAt,
      updated.updatedAt,
    );
  }
}
