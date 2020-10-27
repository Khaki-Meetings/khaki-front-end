import { TestBed } from '@angular/core/testing';

import { SinceTimeBlockSummariesFacadeService } from './since-time-block-summaries-facade.service';

describe('SinceTimeBlockSummariesFacadeService', () => {
  let service: SinceTimeBlockSummariesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinceTimeBlockSummariesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
