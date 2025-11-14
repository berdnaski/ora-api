import { User } from "../domain/user.entity";

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  churchId: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<User>) {
    this.id = user.id!;
    this.name = user.name!;
    this.email = user.email!;
    this.photo = user.photo ?? null;
    this.churchId = user.churchId ?? null;
    this.createdAt = user.createdAt!;
    this.updatedAt = user.updatedAt!;
  }
}
