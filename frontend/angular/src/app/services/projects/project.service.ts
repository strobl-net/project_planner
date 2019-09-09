import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../../components/pages/projects/project.model.temp";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = "http://127.0.0.1:8080/api/projects/";
  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]>{
    return this.http.get<Project[]>(this.url);
  }

  getByID(id: number): Observable<Project>{
    return this.http.get<Project>(this.url + id);
  }
}
