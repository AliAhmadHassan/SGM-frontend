import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTransferBetweenInstallationsComponent } from './form-transfer-between-installations.component';

describe('FormTransferBetweenInstallationsComponent', () => {
  let component: FormTransferBetweenInstallationsComponent;
  let fixture: ComponentFixture<FormTransferBetweenInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTransferBetweenInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTransferBetweenInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
