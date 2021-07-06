import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  setIntervalAction,
  setStatisticsScopeAction,
  loadSharedStatisticsAction
} from 'khaki-teams';
import {map} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {BaseChildrenStatisticsFiltersEffects} from './base-children-statistics-filters.effects';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';

@Logging
@Injectable()
export class TeamsModuleStatisticsFiltersEffects extends BaseChildrenStatisticsFiltersEffects {
  private logger: HistorianService;

  teamsSetIntervalEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setIntervalAction),
      map(action => {
        this.logger.debug('effect', action);
        return setStatisticsFiltersAction({interval: action.interval});
      }),
    )
  );

  teamsSetStatisticsScopeEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsScopeAction),
      map(action => {
        this.logger.debug('effect', action);
        return setStatisticsFiltersAction({statisticsScope: action.scope});
      }),
    )
  );

  teamsLoadSharedStatisticsFiltersEffect = createEffect(
    () => this.actions$.pipe(
      ofType(loadSharedStatisticsAction),
      map(() => setStatisticsFiltersAction({}))
    )
  );

  constructor(
    private actions$: Actions
  ) {
    super();
  }

}
