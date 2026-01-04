import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateRmaComponent } from './form-create-rma.component';

describe('FormCreateRmaComponent', () => {
  let component: FormCreateRmaComponent;
  let fixture: ComponentFixture<FormCreateRmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreateRmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateRmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
