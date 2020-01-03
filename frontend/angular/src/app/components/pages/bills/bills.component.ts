import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BillService} from "../../../services/bills/bill.service";
import {Bill} from "../../../services/bills/bill.model.temp";
import {MatDialog} from "@angular/material/dialog";
import {AddBillModalComponent} from "../../modals/add-modals/add-bill-modal/add-bill-modal.component";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  public bills: Bill[];
  expandedElement: Bill;
  public current_search: string;
  public items: any[];
  displayedColumns: string[] = ['id', 'amount', 'project', 'seller', 'ordered_by', 'date_order', 'paid', 'date_paid'];
  resultsLength = 0;
  isRateLimitReached = false;
  isLoading: boolean = true;


  constructor(private bill_service: BillService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.refresh();
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


  public openAddBill(): void {
    this.dialog.open(AddBillModalComponent, {width: '60%', height: '80%'}).afterClosed().subscribe(
      result => {
        this.refresh();
      }
    );
  }

  createNewBill() {
  }
}
