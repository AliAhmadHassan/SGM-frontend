import { TestBed } from '@angular/core/testing';

import { RmaAttendanceService } from './rma-attendance.service';

describe('RmaAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RmaAttendanceService = TestBed.get(RmaAttendanceService);
    expect(service).toBeTruthy();
  });
});
