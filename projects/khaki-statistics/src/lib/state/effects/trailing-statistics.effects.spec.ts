import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {TrailingStatisticsEffects} from './trailing-statistics.effects';

describe('TrailingStatisticsEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: TrailingStatisticsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrailingStatisticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TrailingStatisticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
