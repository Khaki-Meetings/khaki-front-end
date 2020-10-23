import { TestBed } from '@angular/core/testing';

import { KhakiStatisticsService } from './khaki-statistics.service';

describe('KhakiStatisticsService', () => {
  let service: KhakiStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
