import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDirectDevolutionThirdyComponent } from './form-direct-devolution-thirdy.component';

describe('FormDirectDevolutionThirdyComponent', () => {
  let component: FormDirectDevolutionThirdyComponent;
  let fixture: ComponentFixture<FormDirectDevolutionThirdyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDirectDevolutionThirdyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDirectDevolutionThirdyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
