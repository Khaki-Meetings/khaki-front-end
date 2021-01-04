import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {tap} from 'rxjs/operators';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {AllStatisticsFacadeService} from '../facades/all-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable()
export class StatisticsFiltersChangeEffects {
  private logger: HistorianService;

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setCurrentTimeIntervalAction, setStatisticsFiltersAction),
      tap(
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
