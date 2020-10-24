import { TestBed } from '@angular/core/testing';

import { TrailingStatisticsService } from './trailing-statistics.service';

describe('TrailingStatisticsService', () => {
  let service: TrailingStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailingStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
