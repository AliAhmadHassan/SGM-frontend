import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaAttendanceComponent } from './rma-attendance.component';

describe('RmaAttendanceComponent', () => {
  let component: RmaAttendanceComponent;
  let fixture: ComponentFixture<RmaAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmaAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmaAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
