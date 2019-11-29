import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "../../../services/bills/bill.model.temp";
import {ItemService} from "../../../services/items/item.service";
import {MatDialog} from "@angular/material/dialog";
import {AddBillComponent} from "../../modals/add-bill/add-bill.component";


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



  constructor(private bill_service: BillService,
              private itemService: ItemService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.refresh();
    this.new_bill = new Bill()
  }


  public refresh = () => {
    this.bill_service.getAll().subscribe(
      data => {
        this.bills = data;
        this.resultsLength = data.length;
        this.changeDetectorRef.detectChanges();
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

  public openAddBill(): void {
    this.dialog.open(AddBillComponent, {width: '30%', height: '60%',data: {}}).afterClosed().subscribe(
      result => {
        this.refresh()
      }
    );
  }



  updateSearchProduct() {
    this.getFilteredProducts(this.current_search)
  }

  createNewBill() {

  }
}
