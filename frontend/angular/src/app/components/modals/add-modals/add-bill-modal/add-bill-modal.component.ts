import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillsComponent} from "../../../pages/bills/bills.component";
import {FormBuilder, FormArray, FormGroup, Validators, FormControl} from "@angular/forms";
import {Bill} from "../../../../services/bills/bill.model.temp";
import {BillService} from "../../../../services/bills/bill.service";
import {ProductService} from "../../../../services/products/product.service";
import {Product} from "../../../../services/products/product.model";
import {debounceTime, finalize, startWith} from "rxjs/operators";
import {Project} from "../../../../services/projects/project.model";
import {ProjectService} from "../../../../services/projects/project.service";
import {UserService} from "../../../../services/auth/user.service";
import {UserModel} from "../../../../services/auth/user.model.temp";
import {Seller} from "../../../../services/sellers/seller.model";
import {SellerService} from "../../../../services/sellers/seller.service";
import * as moment from 'moment';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill-modal.component.html',
  styleUrls: ['./add-bill-modal.component.scss']
})
export class AddBillModalComponent implements OnInit {
  billForm: FormGroup;
  debug: boolean = false;
  isLoadingProducts: boolean = false;

  possibleProjects: Project[];

  possibleBuyers: UserModel[];

  possibleSellers: Seller[];

  input: Product[];
  possibleProducts: Product[][];

  constructor(public fb: FormBuilder, private matDialogRef: MatDialogRef<BillsComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private projectService: ProjectService,
              private billService: BillService, private productService: ProductService,
              private userService: UserService, private sellerService: SellerService) {
  }

  onSubmitBill() {
    let billNew = new Bill();
    billNew.intake = this.billBools.get('intake').value;
    billNew.digital = this.billBools.get('digital').value;
    billNew.paid = this.billBools.get('paid').value;
    billNew.amount = this.amount.value;
    billNew.project = this.possibleProjects[0].id;

    let date_order: string = moment(this.date_order.value).format('YYYY-MM-DD');
    console.log(date_order);
    billNew.date_order = date_order;

    let date_paid: string = moment(this.date_paid.value).format('YYYY-MM-DD');
    console.log(date_paid);
    if (date_paid != "Invalid date") {
      billNew.date_paid = date_paid;
    }

    billNew.ordered_by = this.possibleBuyers[0].id;
    billNew.seller = this.possibleSellers[0].id;
    let products_local = this.productForms.value;

    let productsArray: Product[][] = this.possibleProducts;
    let productsIDArray: number[] = [];
    for (let product_local of products_local) {
      for (let i = 0; i < productsArray.length; i++) {
        if (product_local.name == productsArray[i][0].name) {
          for (let j = 0; j < product_local.amount; j++) {
            productsIDArray.push(productsArray[i][0].id);
          }
        }
      }
    }

    billNew.products = productsIDArray;
    console.log(billNew);
    this.createPost(billNew);
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
    this.billForm.get('project').valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(
        result => {
          this.getSearchedProjects(result);
        },
      );
    this.billForm.get('ordered_by').valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(
        result => {
          this.getSearchedUser(result);
        },
      );
    this.billForm.get('seller').valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(
        result => {
          this.getSearchedSeller(result);
        },
      );
    this.billForm.get('products').valueChanges
      .pipe(
        startWith(""),
        debounceTime(500),
      )
      .subscribe(
        nameAndAmountInputArray => {
          this.isLoadingProducts = true;
          let tempInputNames: string[] = [];
          for (let nameAndAmountInput of nameAndAmountInputArray) {
            tempInputNames.push(nameAndAmountInput.name)
          }
          this.getSearchedProducts(tempInputNames);
        }
      );
  }

  getSearchedProjects = (search: string) => {
    this.projectService.getSearched(search).subscribe(
      data => {
        this.possibleProjects = data;
      },
      error => {
        console.log(error);
      })
  };

  getSearchedUser = (search: string) => {
    this.userService.getSearched(search).subscribe(
      data => {
        this.possibleBuyers = data;
      },
      error => {
        console.log(error);
      })
  };

  getSearchedSeller = (search: string) => {
    this.sellerService.getSearched(search).subscribe(
      data => {
        this.possibleSellers = data;
      },
      error => {
        console.log(error);
      })
  };

  createPost = (bill: Bill) => {
    this.billService.post(bill).subscribe(
      (val) => {
        console.log("Post call successfully value returned in body", val);
      },
      response => {
        console.log("Post call in error", response);
      },
      () => {
        console.log("The Post observable is now completed.");
      }
    )
  };

  getSearchedProducts(search: string[]) {
    this.productService.getMultipleSearched(search)
      .pipe(
        finalize(() => {
          // console.log("==========");
          // console.log("complete");
          // console.log(this.possibleProducts);
          // console.log("==========");
        }),
      )
      .subscribe(
        data => {
          for (let dat of data) {
          }
          this.possibleProducts = data;
          this.isLoadingProducts = false;
        },
        error => {
          console.log(error);
          this.isLoadingProducts = false;
        });
  };

  get billBools() {
    return this.billForm.get('billBool');
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

  close() {
    this.matDialogRef.close();
  }
}
