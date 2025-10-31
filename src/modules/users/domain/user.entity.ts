export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}