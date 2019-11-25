import { Component, OnInit } from '@angular/core';
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "../../../services/bills/bill.model.temp";
import {ItemService} from "../../../services/items/item.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  public bills: Bill[];
  expandedElement: any;
  public new_bill: Bill;
  public current_search: string;
  public items: any[];
  displayedColumns: string[] = ['id', 'amount', 'project', 'seller', 'ordered_by', 'date_order', 'paid', 'date_paid'];
  resultsLength = 0;
  isRateLimitReached = false;
  isLoading: boolean = true;



  constructor(private bill_service: BillService, private itemService: ItemService) {
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
        this.isLoading = false;
        this.resultsLength = data.length
      },
      error => {
        console.log(error);
      })
  };

  getFilteredProducts = (filter: string) => {
    this.itemService.getFiltered(this.current_search).subscribe(
      data => {
        this.items = data;
        console.log("-=-=-=-=-=-=-=-=-=-=-");
        console.log(this.items);
        console.log("-=-=-=-=-=-=-=-=-=-=-");
      },
      error => {
        console.log(error);
      })
  };



  updateSearchProduct() {
    this.getFilteredProducts(this.current_search)
  }

  createNewBill() {

  }
}
