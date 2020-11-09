import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/errorSm';
import {of} from 'rxjs';
import {StatisticsService} from '../../services/statistics.service';
import {loadTrailingStatistics, loadTrailingStatisticsFailure, loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';


@Injectable()
export class TrailingStatisticsEffects {

  trailingStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTrailingStatistics),
      switchMap(
        () => this.statisticsService.getTrailingStatistics()
          .pipe(
            map(trailingStatistics => loadTrailingStatisticsSuccess(trailingStatistics)),
            catchError(
              (error: ErrorSm) => of(loadTrailingStatisticsFailure(error))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private statisticsService: StatisticsService) {
  }

}
