import { TestBed } from '@angular/core/testing';

import { TransferAttendanceMaterialService } from './transfer-attendance-material.service';

describe('TransferAttendanceMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferAttendanceMaterialService = TestBed.get(TransferAttendanceMaterialService);
    expect(service).toBeTruthy();
  });
});
