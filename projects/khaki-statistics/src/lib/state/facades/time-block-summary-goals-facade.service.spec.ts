import { TestBed } from '@angular/core/testing';

import { TimeBlockSummaryGoalsFacadeService } from './time-block-summary-goals-facade.service';

describe('TimeBlockSummaryGoalsFacadeService', () => {
  let service: TimeBlockSummaryGoalsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeBlockSummaryGoalsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
