import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithInvoiceAndWithoutOrderComponent } from './form-with-invoice-and-without-order.component';

describe('FormWithInvoiceAndWithoutOrderComponent', () => {
  let component: FormWithInvoiceAndWithoutOrderComponent;
  let fixture: ComponentFixture<FormWithInvoiceAndWithoutOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWithInvoiceAndWithoutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithInvoiceAndWithoutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
