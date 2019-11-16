import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "../../../services/bills/bill.model.temp";
import {Project} from "../projects/project.model.temp";
import {ProjectService} from "../../../services/projects/project.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.styl']
})
export class BillsComponent implements OnInit {

  public bills: Bill[];

  bills_loading: boolean = true;


  constructor(private bill_service: BillService) {
    this.bill_service = bill_service;
  }

  ngOnInit() {
    this.getBills();
  }


  getBills = () => {
    this.bill_service.getAll().subscribe(
      data => {
        this.bills = data;
        this.bills_loading = false;
      },
      error => {
        console.log(error);
      })
  };

}
