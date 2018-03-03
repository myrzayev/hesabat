export class User {
  constructor(
    public email: string,
    public pass: string,
    public name: string,
    public id?: number
  ) {}
}
