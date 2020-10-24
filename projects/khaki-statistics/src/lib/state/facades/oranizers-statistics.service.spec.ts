import { TestBed } from '@angular/core/testing';

import { OranizersStatisticsService } from './oranizers-statistics.service';

describe('OranizersStatisticsService', () => {
  let service: OranizersStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OranizersStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
