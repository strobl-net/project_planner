import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../../../services/projects/project.model";
import {ProjectService} from "../../../services/projects/project.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProjectModalComponent} from "../../modals/add-modals/add-project-modal/add-project-modal.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public projects_loading: boolean = true;
  public new_project: Project;
  public member_ids: String;
  resultsLength = 0;

  constructor(private project_service: ProjectService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.refresh();
  }


  public refresh = () => {
    this.project_service.getAll().subscribe(
      data => {
        this.projects = data;
        this.resultsLength = data.length;
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error)
      }
    )
  };

  public openAddProject(): void {
    this.dialog.open(AddProjectModalComponent, {width: '60%', height: '50%'}).afterClosed().subscribe(
      result => {
        this.refresh();
      }
    )
  }
}
