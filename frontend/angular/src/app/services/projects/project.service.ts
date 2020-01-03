import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "./project.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = "http://127.0.0.1:8080/api/projects/";
  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getByID(id: number): Observable<Project> {
    return this.http.get<Project>(this.url + id, {headers: this.http_headers});
  }

  post(project: Project): Observable<any> {
    return this.http.post<Project>(this.url, project, {headers: this.http_headers});
  }

  getSearched(parameter: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + "?search=" + parameter);
  }

  getByName(parameter: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + "?name=" + parameter);
  }
}
