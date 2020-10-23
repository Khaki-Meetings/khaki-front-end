import { TestBed } from '@angular/core/testing';

import { PerDepartmentStatisticsService } from './per-department-statistics.service';

describe('PerDepartmentStatisticsService', () => {
  let service: PerDepartmentStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerDepartmentStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
