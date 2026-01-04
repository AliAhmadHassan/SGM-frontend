import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDirectTemporaryCustodyComponent } from './form-direct-temporary-custody.component';

describe('FormDirectTemporaryCustodyComponent', () => {
  let component: FormDirectTemporaryCustodyComponent;
  let fixture: ComponentFixture<FormDirectTemporaryCustodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDirectTemporaryCustodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDirectTemporaryCustodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
