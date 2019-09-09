import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../../components/pages/bills/bill.model.temp";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url: string = "http://127.0.0.1:8080/api/bills/";
  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bill[]>{
    return this.http.get<Bill[]>(this.url, {headers: this.http_headers});
  }

  getByID(id: number): Observable<Bill>{
    return this.http.get<Bill>(this.url + id, {headers: this.http_headers});
  }
}
