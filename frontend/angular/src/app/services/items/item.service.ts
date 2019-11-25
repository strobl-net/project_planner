import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Bill} from "../bills/bill.model.temp";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url: string = "http://127.0.0.1:8080/api/products/";

  constructor(private http: HttpClient) {
  }

  getAll(): any {
    return this.http.get(this.url);
  }

  getFiltered(parameter: string): any {
    return this.http.get(this.url + "?search=" + parameter);
  }
}
