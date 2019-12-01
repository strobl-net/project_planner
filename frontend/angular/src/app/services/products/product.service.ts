import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Bill} from "../bills/bill.model.temp";
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://127.0.0.1:8080/api/products/";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getSearched(parameter: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "?search=" + parameter);
  }

  getByName(parameter: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "?name=" + parameter);
  }
}
