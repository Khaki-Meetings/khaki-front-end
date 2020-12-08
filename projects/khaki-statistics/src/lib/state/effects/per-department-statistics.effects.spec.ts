import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {PerDepartmentStatisticsEffects} from './per-department-statistics.effects';

describe('PerDepartmentStatisticsEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: PerDepartmentStatisticsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PerDepartmentStatisticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PerDepartmentStatisticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
