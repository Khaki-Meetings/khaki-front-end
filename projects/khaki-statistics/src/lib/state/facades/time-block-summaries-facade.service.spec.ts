import {TestBed} from '@angular/core/testing';

import {TimeBlockSummariesFacadeService} from './time-block-summaries-facade.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('TimeBlockSummariesFacadeService', () => {
  let service: TimeBlockSummariesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [provideMockStore()]});
    service = TestBed.inject(TimeBlockSummariesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
