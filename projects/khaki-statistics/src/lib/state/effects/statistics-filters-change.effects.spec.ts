import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {StatisticsFiltersChangeEffects} from './statistics-filters-change.effects';
import {provideMockStore} from '@ngrx/store/testing';

describe('CurrentTimeIntervalEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: StatisticsFiltersChangeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatisticsFiltersChangeEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(StatisticsFiltersChangeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
