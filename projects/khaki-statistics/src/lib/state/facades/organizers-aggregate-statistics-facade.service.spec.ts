import { TestBed } from '@angular/core/testing';

import { OrganizersAggregateStatisticsFacadeService } from './organizers-aggregate-statistics-facade.service';

describe('OrganizersAggregateStatisticsService', () => {
  let service: OrganizersAggregateStatisticsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizersAggregateStatisticsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
