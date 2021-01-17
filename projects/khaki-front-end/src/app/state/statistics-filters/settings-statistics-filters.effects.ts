import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  StatisticsFiltersFacade as SettingsStatisticsFiltersFacade,
  setStatisticsFiltersAction
} from 'khaki-settings';
import {StatisticsFiltersFacade as StatisticsStatisticsFiltersFacade} from 'khaki-statistics';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';


@Logging
@Injectable()
export class SettingsStatisticsFiltersEffects {
  private logger: HistorianService;

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsFiltersAction),
      tap(action => this.logger.debug('effect', action))
    )
  );


  constructor(
    private actions$: Actions,
    private settingsStatisticsFiltersFacade: SettingsStatisticsFiltersFacade,
    private statisticsStatisticsFiltersFacade: StatisticsStatisticsFiltersFacade
  ) {
  }

}
