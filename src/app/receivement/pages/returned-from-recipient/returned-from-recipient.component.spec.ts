import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedFromRecipientComponent } from './returned-from-recipient.component';

describe('ReturnedFromRecipientComponent', () => {
  let component: ReturnedFromRecipientComponent;
  let fixture: ComponentFixture<ReturnedFromRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnedFromRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedFromRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
