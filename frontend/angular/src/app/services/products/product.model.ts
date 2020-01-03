export class Product {
  id: number;
  name: string;
  current_price: number;
  price_history: number[];
  seller_id: number;
  seller_id_name: string;

  public get getName(): string {
    return this.name;
  }
}
