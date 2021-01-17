import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StatisticsStatisticsFiltersEffects } from './statistics-statistics-filters.effects';

describe('StatisticsStatisticsFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: StatisticsStatisticsFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatisticsStatisticsFiltersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StatisticsStatisticsFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
