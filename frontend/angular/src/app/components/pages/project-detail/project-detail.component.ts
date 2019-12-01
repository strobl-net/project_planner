import {Component, OnInit} from '@angular/core';
import {Project} from "../../../services/projects/project.model";
import {ProjectService} from "../../../services/projects/project.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.styl']
})
export class ProjectDetailComponent implements OnInit {

  project_id: number;
  project: Project;
  project_loading: boolean = true;

  constructor(private route: ActivatedRoute, private pro_service: ProjectService) {
    this.pro_service = pro_service;
  }

  ngOnInit() {
    this.project_id = +this.route.snapshot.paramMap.get('id');
    this.load_project();

  }

  load_project = () => {
    this.project_loading = true;
        this.pro_service.getByID(this.project_id).subscribe(
      data => {
        this.project = data;
        this.project_loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}
