import { TestBed } from '@angular/core/testing';

import { SinceTimeBlockSummariesService } from './since-time-block-summaries.service';

describe('SinceTimeBlockSummariesService', () => {
  let service: SinceTimeBlockSummariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinceTimeBlockSummariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
