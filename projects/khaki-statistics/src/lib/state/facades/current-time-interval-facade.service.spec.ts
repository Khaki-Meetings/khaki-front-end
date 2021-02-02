import {TestBed} from '@angular/core/testing';

import {CurrentTimeIntervalFacadeService} from './current-time-interval-facade.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('CurrentTimeIntervalFacadeService', () => {
  let service: CurrentTimeIntervalFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    service = TestBed.inject(CurrentTimeIntervalFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
