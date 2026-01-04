import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithInvoiceAndWithOrderComponent } from './with-invoice-and-with-order.component';

describe('WithInvoiceAndWithOrderComponent', () => {
  let component: WithInvoiceAndWithOrderComponent;
  let fixture: ComponentFixture<WithInvoiceAndWithOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithInvoiceAndWithOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithInvoiceAndWithOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
