import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBetweenInstallationsComponent } from './transfer-between-installations.component';

describe('TransferBetweenInstallationsComponent', () => {
  let component: TransferBetweenInstallationsComponent;
  let fixture: ComponentFixture<TransferBetweenInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferBetweenInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferBetweenInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
