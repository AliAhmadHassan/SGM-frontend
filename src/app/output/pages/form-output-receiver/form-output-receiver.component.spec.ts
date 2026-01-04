import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutputReceiverComponent } from './form-output-receiver.component';

describe('FormOutputReceiverComponent', () => {
  let component: FormOutputReceiverComponent;
  let fixture: ComponentFixture<FormOutputReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOutputReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOutputReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
