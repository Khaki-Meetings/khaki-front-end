import { TestBed } from '@angular/core/testing';

import { OrganizersStatisticsFacadeService } from './organizers-statistics-facade.service';

describe('OrganizersStatisticsService', () => {
  let service: OrganizersStatisticsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizersStatisticsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
