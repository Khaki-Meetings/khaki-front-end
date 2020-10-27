import { TestBed } from '@angular/core/testing';

import { TrailingStatisticsFacadeService } from './trailing-statistics-facade.service';

describe('TrailingStatisticsFacadeService', () => {
  let service: TrailingStatisticsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailingStatisticsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
