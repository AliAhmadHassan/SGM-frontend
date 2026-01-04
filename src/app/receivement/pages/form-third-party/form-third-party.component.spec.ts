import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThirdPartyComponent } from './form-third-party.component';

describe('FormThirdPartyComponent', () => {
  let component: FormThirdPartyComponent;
  let fixture: ComponentFixture<FormThirdPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThirdPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThirdPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
