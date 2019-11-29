import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillsComponent} from "../../pages/bills/bills.component";
import {FormBuilder, FormArray, FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  billForm: FormGroup;
  debug: boolean = false;

  constructor(public fb: FormBuilder, private matDialogRed: MatDialogRef<BillsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onSubmitBill() {
    console.log("submitted")
  }

  ngOnInit() {
    const billBool = this.fb.group({
      intake: new FormControl(false),
      digital: new FormControl(false),
      paid: new FormControl(false),
    });
    this.billForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      project: new FormControl('', [Validators.required]),
      date_order: new FormControl('', [Validators.required]),
      date_paid: new FormControl(''),
      ordered_by: new FormControl('', [Validators.required]),
      seller: new FormControl('', [Validators.required]),
      billBool,
      products: this.fb.array([], []),
    });
  }

  get amount() {
    return this.billForm.get('amount');
  }

  get project() {
    return this.billForm.get('project');
  }

  get date_order() {
    return this.billForm.get('date_order');
  }

  get date_paid() {
    return this.billForm.get('date_paid');
  }

  get ordered_by() {
    return this.billForm.get('ordered_by');
  }

  get seller() {
    return this.billForm.get('seller');
  }

  get productForms() {
    return this.billForm.get('products') as FormArray;
  }

  addProduct() {
    let product = this.fb.group({
      amount: new FormControl(1, [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.productForms.push(product);
  }

  deleteProduct(i: number) {
    this.productForms.removeAt(i)
  }

  public close() {
    this.matDialogRed.close();
  }
}
