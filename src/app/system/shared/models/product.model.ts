export class Product {
  constructor(
    public barcode: string,
    public name: string,
    public price: number,
    public id?: string
  ) {}
}
