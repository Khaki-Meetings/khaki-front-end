import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  StatisticsFiltersFacade as SettingsStatisticsFiltersFacade
} from 'khaki-settings';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {BaseChildrenStatisticsFiltersEffects} from './base-children-statistics-filters.effects';
import {
  StatisticsFiltersFacade as StatisticsStatisticsFiltersFacade,
  setStatisticsFiltersAction as statisticsSetStatisticsFiltersAction,
} from 'khaki-statistics';


@Logging
@Injectable()
export class StatisticsStatisticsFiltersEffects extends BaseChildrenStatisticsFiltersEffects {
  private logger: HistorianService;

  statistisEffects$ = createEffect(
    () => this.actions$.pipe(
      ofType(statisticsSetStatisticsFiltersAction),
      tap(action => {
        this.logger.debug('effect', action);
        const startEnd = this.calculateTimeBlock(action.statisticsFilters.interval);
        const statisticsFilters = {...action.statisticsFilters};
        statisticsFilters.end = startEnd.end;
        statisticsFilters.start = startEnd.start;
        this.settingsStatisticsFiltersFacade.dispatchSetStatisticsFilters(action.statisticsFilters);
        this.statisticsStatisticsFiltersFacade.dispatchSetStartEndAction(statisticsFilters.start, statisticsFilters.end);
      }),
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private settingsStatisticsFiltersFacade: SettingsStatisticsFiltersFacade,
    private statisticsStatisticsFiltersFacade: StatisticsStatisticsFiltersFacade
  ) {
    super();
  }
}
