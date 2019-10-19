import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "./bill.model.temp";
import {Project} from "../projects/project.model.temp";
import {ProjectService} from "../../../services/projects/project.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.styl']
})
export class BillsComponent implements OnInit {

  public bills: Bill[];
  public projects: Project[];
  bills_loading: boolean = true;
  projects_loading: boolean = true;
  names_set: boolean = false;

  constructor(private bill_service: BillService, private project_service: ProjectService) {
    this.bill_service = bill_service;
  }

  ngOnInit() {
    this.getBills();
    this.getProjects();
  }

  getBills = () => {
    this.bill_service.getAll().subscribe(
      data => {
        this.bills = data;
        this.bills_loading = false;
        this.setProjectNames();
      },
      error => {
        console.log(error);
      })
  };

  getProjects = () => {
    this.project_service.getAll().subscribe(
      data => {
        this.projects = data;
        this.projects_loading = false;
        this.setProjectNames();
      },
      error => {
        console.log(error);
      })
  };

  setProjectNames(): void {
    if(!this.projects_loading && !this.bills_loading){
      for(let i in this.projects){
        for(let j in this.bills){
          if(this.projects[i].id == this.bills[j].project){
            this.bills[j].project_name = this.projects[i].name;
          }
        }
      }
      this.names_set = true
    }
  }

  createNewProject(): void {

  }

}
