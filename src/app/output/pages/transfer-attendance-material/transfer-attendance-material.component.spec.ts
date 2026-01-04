import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAttendanceMaterialComponent } from './transfer-attendance-material.component';

describe('TransferAttendanceMaterialComponent', () => {
  let component: TransferAttendanceMaterialComponent;
  let fixture: ComponentFixture<TransferAttendanceMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferAttendanceMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAttendanceMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
