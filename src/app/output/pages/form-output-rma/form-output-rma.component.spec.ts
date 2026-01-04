import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutputRmaComponent } from './form-output-rma.component';

describe('FormOutputRmaComponent', () => {
  let component: FormOutputRmaComponent;
  let fixture: ComponentFixture<FormOutputRmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOutputRmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOutputRmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
