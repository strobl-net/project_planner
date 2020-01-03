import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAuth} from "./user.auth.model";
import {forkJoin, Observable} from "rxjs";
import {UserModel} from "./user.model.temp";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url_auth: string = 'http://127.0.0.1:8080/api/auth/user';
  private url_get: string = 'http://127.0.0.1:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<UserAuth> {
    return this.http.get<UserAuth>(this.url_auth)
  }

  getByID(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.url_get, {params: {id: id.toString()}})
  }

  getSearched(parameter: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.url_get + "?search=" + parameter)
  }

  getMultipleSearched(parameters: string[]): Observable<any> {
    let responseCollection = [];
    parameters.forEach(parameter =>
      responseCollection.push(this.http.get<Observable<UserModel[]>>(this.url_get + "?search=" + parameter))
    );
    return forkJoin(responseCollection);
  }
}
