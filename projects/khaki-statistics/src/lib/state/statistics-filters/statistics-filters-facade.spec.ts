import { TestBed } from '@angular/core/testing';

import { StatisticsFiltersFacade } from './statistics-filters-facade';

describe('StatisticsFiltersFacade', () => {
  let service: StatisticsFiltersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsFiltersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
