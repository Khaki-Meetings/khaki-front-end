import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {StatisticsService} from '../../services/statistics.service';
import {loadTrailingStatistics, loadTrailingStatisticsFailure, loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../statistics-filters/interval-se.enum';


@Injectable()
export class TrailingStatisticsEffects {

  trailingStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTrailingStatistics),
      mergeMap(() => this.statisticsFiltersFacade.selectStatisticsFilters()),
      switchMap(
        (action) => this.statisticsService.getTrailingStatistics(action.start, IntervalSe[action.interval], {...action})
          .pipe(
            map(trailingStatistics => loadTrailingStatisticsSuccess(trailingStatistics)),
            catchError(
              (error: ErrorSm) => of(loadTrailingStatisticsFailure(error))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private statisticsFiltersFacade: StatisticsFiltersFacade
  ) {
  }

}
