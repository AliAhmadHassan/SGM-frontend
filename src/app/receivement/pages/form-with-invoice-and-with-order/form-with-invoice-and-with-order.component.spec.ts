import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithInvoiceAndWithOrderComponent } from './form-with-invoice-and-with-order.component';

describe('FormWithInvoiceAndWithOrderComponent', () => {
  let component: FormWithInvoiceAndWithOrderComponent;
  let fixture: ComponentFixture<FormWithInvoiceAndWithOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWithInvoiceAndWithOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithInvoiceAndWithOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
