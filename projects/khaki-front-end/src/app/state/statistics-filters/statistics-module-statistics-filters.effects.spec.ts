import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StatisticsModuleStatisticsFiltersEffects } from './statistics-module-statistics-filters-effects.service';

describe('StatisticsStatisticsFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: StatisticsModuleStatisticsFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatisticsModuleStatisticsFiltersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StatisticsModuleStatisticsFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
