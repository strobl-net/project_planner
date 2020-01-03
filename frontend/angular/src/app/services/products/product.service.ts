import {Injectable} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
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

  getMultipleSearched(parameters: string[]): Observable<any> {
    let responseCollection = [];
    parameters.forEach(parameter =>
      responseCollection.push(this.http.get<Observable<Product[]>>(this.url + "?search=" + parameter))
    );
    return forkJoin(responseCollection);
  }

  getMultipleByID(ids: number[]): Observable<any> {
    let responseCollection = [];
    ids.forEach(id =>
      responseCollection.push(this.http.get<Observable<Product>>(this.url + "?id=" + id))
    );
    return forkJoin(responseCollection);
  }

  getByName(parameter: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "?name=" + parameter);
  }
}
