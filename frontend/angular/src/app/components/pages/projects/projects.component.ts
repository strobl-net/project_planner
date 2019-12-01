import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../../../services/projects/project.model";
import {ProjectService} from "../../../services/projects/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Observable<Project[]>;
  public projects_loading: boolean = true;
  public new_project: Project;
  public member_ids: String;

  constructor(private project_service: ProjectService) {
    this.project_service = project_service;
  }

  ngOnInit() {
    this.getProjects();
    this.initProject();
  }

  getProjects = () => {
    this.projects_loading = true;
    this.projects = this.project_service.getAll();
    this.projects_loading = false;
  };

  createNewProject() {
    if (this.new_project.name != '' && this.new_project.description != '' && this.new_project.lead != '')
      this.new_project.member_ids = this.member_ids.split(',').map(Number);
      if(!this.new_project.member_ids.includes(+this.new_project.lead)){
        this.new_project.member_ids.push(+this.new_project.lead)
      }
      this.project_service.create(this.new_project).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log('error' + error)
        },
      );
  }

  private initProject() {
    this.new_project = new Project()
  }
}
