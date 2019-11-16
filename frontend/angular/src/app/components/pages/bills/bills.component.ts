import { Component, OnInit } from '@angular/core';
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "../../../services/bills/bill.model.temp";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.styl']
})
export class BillsComponent implements OnInit {

  public bills: Bill[];
  public new_bill: Bill;

  bills_loading: boolean = true;


  constructor(private bill_service: BillService) {
    this.bill_service = bill_service;
  }

  ngOnInit() {
    this.getBills();
    this.new_bill = new Bill()
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

  createNewBill() {

  }
}
