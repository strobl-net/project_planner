import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "./bill.model.temp";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url: string = "http://127.0.0.1:8080/api/bills/";

  constructor(private http: HttpClient) {
  }

  post(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.url, bill);
  }

  put(id: number, bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(this.url + id + "/", bill);
  }

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.url);
  }

  getByID(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.url + id);
  }
}
