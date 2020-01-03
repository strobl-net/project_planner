import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillsComponent} from "../../../pages/bills/bills.component";
import {ProjectService} from "../../../../services/projects/project.service";
import {BillService} from "../../../../services/bills/bill.service";
import {ProductService} from "../../../../services/products/product.service";
import {UserService} from "../../../../services/auth/user.service";
import {SellerService} from "../../../../services/sellers/seller.service";
import {debounceTime, finalize, startWith} from "rxjs/operators";
import {Bill} from "../../../../services/bills/bill.model.temp";
import {Project} from "../../../../services/projects/project.model";
import {UserModel} from "../../../../services/auth/user.model.temp";
import {Seller} from "../../../../services/sellers/seller.model";
import {Product} from "../../../../services/products/product.model";
import * as moment from "moment";

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styleUrls: ['./bill-modal.component.scss']
})
export class BillModalComponent implements OnInit {

  billForm: FormGroup;
  debug: boolean = false;
  isLoading: boolean = false;
  isLoadingProducts: boolean = false;

  initBill: Bill;

  possibleProjects: Project[] = [];

  possibleBuyers: UserModel[] = [];

  possibleSellers: Seller[] = [];

  input: Product[] = [];
  possibleProducts: Product[][] = [[]];

  initProductAmounts: number[] = [];
  initProductIDs: number[] = [];
  initProducts: Product[][] = [[]];

  constructor(public fb: FormBuilder, private matDialogRef: MatDialogRef<BillsComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private projectService: ProjectService,
              private billService: BillService, private productService: ProductService,
              private userService: UserService, private sellerService: SellerService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.setInitBill(this.data);
  }

  setupForm() {
    const billBool = this.fb.group({
      intake: new FormControl(this.initBill.intake),
      digital: new FormControl(this.initBill.digital),
      paid: new FormControl(this.initBill.paid),
    });
    this.billForm = this.fb.group({
      amount: new FormControl(this.initBill.amount, [Validators.required]),
      project: new FormControl(this.initBill.project_name, [Validators.required]),
      date_order: new FormControl(this.initBill.date_order, [Validators.required]),
      date_paid: new FormControl(this.initBill.date_paid),
      ordered_by: new FormControl(this.initBill.ordered_by_name, [Validators.required]),
      seller: new FormControl(this.initBill.seller_name, [Validators.required]),
      description: new FormControl(this.initBill.description),
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

  setupProducts() {
    'use strict';

    //ex: [1, 1, 2]
    let productsArray = this.initBill.products;

    //ex: {1: 2, 2: 1}
    let dictOfProducts = {};
    for (let productID of productsArray) {
      if (!(productID in dictOfProducts)) {
        dictOfProducts[productID] = 1;
      } else {
        dictOfProducts[productID] += 1;
      }
    }
    //ex: [1, 2] (keys)
    //ex: [2, 1] (values)
    for (const [key, value] of Object.entries(dictOfProducts)) {
      this.initProductIDs.push(+key);
      this.initProductAmounts.push(+value);
    }
    this.initFirstProducts(this.initProductIDs);
  }

  setupDisplayProducts() {
    this.possibleProducts = this.initProducts;
    for (let i = 0; i < this.initProducts.length; i++) {
      let tmp_name: string = this.initProducts[i][0].name;
      this.addProductWithValues(this.initProductAmounts[i], tmp_name)
    }
  }

  onSubmitBill() {
    let billNew = new Bill();
    billNew.intake = this.billBools.get('intake').value;
    billNew.digital = this.billBools.get('digital').value;
    billNew.paid = this.billBools.get('paid').value;
    billNew.amount = this.amount.value;
    billNew.project = this.possibleProjects[0].id;

    let date_order: string = moment(this.date_order.value).format('YYYY-MM-DD');
    billNew.date_order = date_order;

    let date_paid: string = moment(this.date_paid.value).format('YYYY-MM-DD');
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
    this.updateBill(this.initBill.id, billNew);
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

  getSearchedProducts(search: string[]) {
    this.productService.getMultipleSearched(search)
      .pipe(
        finalize(() => {
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

  setInitBill = (id: number) => {
    this.billService.getByID(id)
      .subscribe(
        data => {
          this.initBill = data;
          console.log(this.initBill);
          this.isLoading = false;
          this.setupForm();
          this.setupProducts();
          this.initFirstProject(data.project);
          this.initFirstSeller(data.seller);
          this.initFirstBuyer(data.ordered_by);
        },
        error => {
          console.log(error)
        }
      )
  };

  initFirstProject = (id: number) => {
    this.projectService.getByID(id).subscribe(
      data => {
        this.possibleProjects[0] = data;
      }
    )
  };

  initFirstSeller = (id: number) => {
    this.sellerService.getByID(id).subscribe(
      data => {
        this.possibleSellers[0] = data;
      }
    )
  };

  initFirstBuyer = (id: number) => {
    this.userService.getByID(id).subscribe(
      data => {
        this.possibleBuyers[0] = data;
      }
    )
  };

  initFirstProducts = (ids: number[]) => {
    this.productService.getMultipleByID(ids).subscribe(
      data => {
        this.initProducts = data;
        this.setupDisplayProducts();
      }
    )
  };

  updateBill = (id: number, bill: Bill) => {
    this.billService.put(id, bill).subscribe(
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

  get description() {
    return this.billForm.get('description');
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

  addProductWithValues(amount: number, name: string) {
    console.log(name);
    let product = this.fb.group({
      amount: new FormControl(amount, [Validators.required]),
      name: new FormControl(name, [Validators.required])
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

