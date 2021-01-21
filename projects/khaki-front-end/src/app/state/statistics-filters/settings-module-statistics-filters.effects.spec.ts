import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SettingsModuleStatisticsFiltersEffects } from './settings-module-statistics-filters-effects.service';
import {hot} from 'jasmine-marbles';
import {setStatisticsFiltersAction} from 'khaki-settings';
import {provideMockStore} from '@ngrx/store/testing';

describe('SettingsStatisticsFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: SettingsModuleStatisticsFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsModuleStatisticsFiltersEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: {}})
      ]
    });

    effects = TestBed.inject(SettingsModuleStatisticsFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fingz', () => {
    actions$ = hot(
      '--a-',
      {a: setStatisticsFiltersAction}
    );

    expect(effects.settingsEffects$).toBeObservable({});
  });
});
