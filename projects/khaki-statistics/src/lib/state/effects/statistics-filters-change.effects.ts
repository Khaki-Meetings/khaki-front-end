import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {AllStatisticsFacadeService} from '../facades/all-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {setStatisticsFiltersAction} from '../statistics-filters/set-statistics-filters.actions';

@Logging
@Injectable()
export class StatisticsFiltersChangeEffects {
  private logger: HistorianService;

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsFiltersAction),
      tap(action => this.logger.debug('action', action)),
      map(
        () => {
          console.log('setCurrentTimeIntervalAction, setStatisticsFiltersAction, setDepartmentAction'); // was natr-historian  this.logger.debug
          this.allStatisticsFacade.requestAllStatistics();
        }
      )
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private allStatisticsFacade: AllStatisticsFacadeService) {
  }

}
