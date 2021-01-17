import { TestBed } from '@angular/core/testing';

import { StatisticsFiltersFacade } from './statistics-filters-facade.service';

describe('StatisticsFiltersFacadeService', () => {
  let service: StatisticsFiltersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsFiltersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
