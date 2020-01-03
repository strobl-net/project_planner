export class Bill {
  id: number;
  amount_currency: string;
  amount: number;
  intake: boolean;
  digital: boolean;
  paid: boolean;
  products: number[];
  ordered_by: any;
  ordered_by_name: string;
  project: number;
  project_name: string;
  seller: number;
  seller_name: string;
  date_order: string;
  date_paid: string;
  created: any;
  description: string;
  image: string;
}
