import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {AllStatisticsFacadeService} from '../facades/all-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable()
export class StatisticsFiltersChangeEffects {
  private logger: HistorianService;

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType('[StatisticsFilter] Set StatisticsFilters'),
      tap(action => this.logger.debug('action', action)),
      map(
        () => {
          this.logger.debug('setCurrentTimeIntervalAction, setStatisticsFiltersAction');
          this.allStatisticsFacade.requestAllStatistics();
        }
      )
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private allStatisticsFacade: AllStatisticsFacadeService) {
  }

}