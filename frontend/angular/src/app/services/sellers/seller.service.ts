import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seller} from "./seller.model";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private url: string = "http://127.0.0.1:8080/api/sellers/";
  private search_url: string = "http://127.0.0.1:8080/api/sellers?";
  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.url);
  }

  getByID(id: number): Observable<Seller> {
    return this.http.get<Seller>(this.url + id, {headers: this.http_headers});
  }

  create(new_seller: Seller): Observable<any> {
    const body = {
      name: new_seller.name,
      area: new_seller.area
    };
    return this.http.post(this.url, body, {headers: this.http_headers});
  }

  getSearched(parameter: string): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.search_url + "search=" + parameter);
  }

  getByName(parameter: string): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.search_url + "name=" + parameter);
  }
}
