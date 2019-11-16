import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "./bill.model.temp";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url: string = "http://127.0.0.1:8080/api/bills/";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bill[]>{
    return this.http.get<Bill[]>(this.url);
  }

  getByID(id: number): Observable<Bill>{
    return this.http.get<Bill>(this.url + id);
  }
}
