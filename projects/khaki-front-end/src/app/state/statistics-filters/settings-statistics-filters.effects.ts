import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  setStatisticsFiltersAction as settingsSetStatisticsFiltersAction,
  StatisticsFiltersFacade as SettingsStatisticsFiltersFacade
} from 'khaki-settings';
import {StatisticsFiltersFacade as StatisticsStatisticsFiltersFacade} from 'khaki-statistics';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {BaseChildrenStatisticsFiltersEffects} from './base-children-statistics-filters.effects';

@Logging
@Injectable()
export class SettingsStatisticsFiltersEffects extends BaseChildrenStatisticsFiltersEffects {
  private logger: HistorianService;

  settingsEffects$ = createEffect(
    () => this.actions$.pipe(
      ofType(settingsSetStatisticsFiltersAction),
      tap(action => {
        this.logger.debug('effect', action);
        const startEnd = this.calculateTimeBlock(action.statisticsFilters.interval);
        const statisticsFilters = {...action.statisticsFilters};
        statisticsFilters.end = startEnd.end;
        statisticsFilters.start = startEnd.start;
        this.statisticsStatisticsFiltersFacade.dispatchSetStatisticsFilters(action.statisticsFilters);
        this.settingsStatisticsFiltersFacade.dispatchSetStartEndAction(statisticsFilters.start, statisticsFilters.end);
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
