export class UserProfile {
  constructor(
    public id: string,
    public userId: string,
    public phone?: string | null,
    public address?: string | null,
    public birthDate?: Date | null,
    public baptismDate?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
