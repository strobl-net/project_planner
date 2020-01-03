import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddBillModalComponent} from './add-bill-modal.component';

describe('AddBillComponent', () => {
  let component: AddBillModalComponent;
  let fixture: ComponentFixture<AddBillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
