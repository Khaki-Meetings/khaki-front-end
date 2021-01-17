import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SettingsStatisticsFiltersEffects } from './settings-statistics-filters.effects';
import {hot} from 'jasmine-marbles';
import {setStatisticsFiltersAction} from 'khaki-settings';
import {provideMockStore} from '@ngrx/store/testing';

describe('SettingsStatisticsFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: SettingsStatisticsFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsStatisticsFiltersEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: {}})
      ]
    });

    effects = TestBed.inject(SettingsStatisticsFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fingz', () => {
    actions$ = hot(
      '--a-',
      {a: setStatisticsFiltersAction}
    );

    expect(effects.effect$).toBeObservable({});
  });
});
