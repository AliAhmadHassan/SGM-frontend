import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReturnedFromRecipientComponent } from './form-returned-from-recipient.component';

describe('FormReturnedFromRecipientComponent', () => {
  let component: FormReturnedFromRecipientComponent;
  let fixture: ComponentFixture<FormReturnedFromRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReturnedFromRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReturnedFromRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
