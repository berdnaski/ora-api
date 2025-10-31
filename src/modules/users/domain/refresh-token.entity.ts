export class RefreshToken {
  constructor(
    public id: string,
    public token: string,
    public userId: string,
    public expiresAt: Date,
    public createdAt?: Date,
  ) {}
}
