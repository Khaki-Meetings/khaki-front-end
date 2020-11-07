import { TestBed } from '@angular/core/testing';

import { TimeBlockSummariesFacadeService } from './time-block-summaries-facade.service';

describe('TimeBlockSummariesFacadeService', () => {
  let service: TimeBlockSummariesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeBlockSummariesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
