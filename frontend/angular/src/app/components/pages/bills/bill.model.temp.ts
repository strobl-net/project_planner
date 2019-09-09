import {Project} from "../projects/project.model.temp";

export class Bill {
  id: number;
  amount_currency: string;
  amount: number;
  intake: boolean;
  digital: boolean;
  paid: boolean;
  products: number[];
  ordered_by: number;
  project: number;
  project_name: string;
  seller: number;
  date_order: any;
  date_paid: any;
  created: any;
  description: string;
  image: string;
}
