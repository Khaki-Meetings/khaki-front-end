import { TestBed } from '@angular/core/testing';

import { StatisticsFiltersFacadeService } from './statistics-filters-facade.service';

describe('StatisticsFilterFacadeService', () => {
  let service: StatisticsFiltersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsFiltersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
