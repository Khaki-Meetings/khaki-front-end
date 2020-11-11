import { TestBed } from '@angular/core/testing';

import { CurrentTimeIntervalFacadeService } from './current-time-interval-facade.service';

describe('CurrentTimeIntervalFacadeService', () => {
  let service: CurrentTimeIntervalFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTimeIntervalFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
