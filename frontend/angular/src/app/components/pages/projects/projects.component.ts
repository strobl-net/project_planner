import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "./project.model.temp";
import {ProjectService} from "../../../services/projects/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.styl']
})
export class ProjectsComponent implements OnInit {

  public projects: Observable<Project[]>;
  public projects_loading: boolean = false;

  constructor(private pro_service: ProjectService) {
    this.pro_service = pro_service;
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects = () => {
    this.projects_loading = true;
    this.projects = this.pro_service.getAll();
    this.projects_loading = false;
  }

}
