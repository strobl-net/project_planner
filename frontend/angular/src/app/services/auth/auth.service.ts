import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuth} from "./user.auth.model";
import {Observable} from "rxjs";
//import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_register: string = 'http://127.0.0.1:8080/api/auth/register/';
  private url_login: string = 'http://127.0.0.1:8080/api/auth/login/';
  private url_logout: string = 'http://127.0.0.1:8080/api/auth/logout/';

  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  register(user_data): Observable<any> {
    return this.http.post(this.url_register, user_data, {headers: this.http_headers})
  }

  login(login_credentials): Observable<any> {
    return this.http.post(this.url_login, login_credentials, {headers: this.http_headers})
  }

  logout(): Observable<any> {
    return this.http.post(this.url_logout, null);
  }
}
