import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillsComponent} from "../../pages/bills/bills.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  billDetailsForm: FormGroup;
  constructor(public fb: FormBuilder, private matDialogRed: MatDialogRef<BillsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  isFormValid(): boolean {
    return this.billDetailsForm.valid;
  }

  onSubmitBill(){

  }

  ngOnInit() {
    this.billDetailsForm = this.fb.group({
      amount: ['', Validators.required],
      project: ['', Validators.required],
      intake: [false, Validators.required],
      digital: [false, Validators.required],
      paid: [false, Validators.required],
      date_order: ['', Validators.required],
      date_paid: [''],
      ordered_by: ['', Validators.required],
      seller: ['', Validators.required],
      products: ['', Validators.required],
    })
  }

  public close(){
    this.matDialogRed.close();
  }
}
