import {TestBed} from '@angular/core/testing';

import {TrailingStatisticsFacadeService} from './trailing-statistics-facade.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('TrailingStatisticsFacadeService', () => {
  let service: TrailingStatisticsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideMockStore()]
    });
    service = TestBed.inject(TrailingStatisticsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
