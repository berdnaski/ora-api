export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public photo: string | null,
    public churchId: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
