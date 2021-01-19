import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  setIntervalAction,
  setStatisticsScopeAction
} from 'khaki-settings';
import {map} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {BaseChildrenStatisticsFiltersEffects} from './base-children-statistics-filters.effects';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';

@Logging
@Injectable()
export class SettingsModuleStatisticsFiltersEffects extends BaseChildrenStatisticsFiltersEffects {
  private logger: HistorianService;

  statisticsSetIntervalEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setIntervalAction),
      map(action => {
        this.logger.debug('effect', action);
        return setStatisticsFiltersAction({interval: action.interval});
      }),
    )
  );

  statisticsSetStatisticsScopeEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsScopeAction),
      map(action => {
        this.logger.debug('effect', action);
        return setStatisticsFiltersAction({statisticsScope: action.scope});
      }),
    )
  );


  constructor(
    private actions$: Actions
  ) {
    super();
  }

}
