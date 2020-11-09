import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/errorSm';
import {of} from 'rxjs';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics, loadPerDepartmentStatisticsSuccess} from '../actions/per-department-statistics.actions';
import {StatisticsService} from '../../services/statistics.service';


@Injectable()
export class PerDepartmentStatisticsEffects {
  perDepartmentStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPerDepartmentStatistics),
      switchMap(
        () => this.statisticsService.getDepartmentStatistics()
          .pipe(
            map(departmentStatistics => loadPerDepartmentStatisticsSuccess({departmentStatistics})),
            catchError(
              (error: ErrorSm) => of(loadTimeBlockSummaryFailure(error))
            )
          )
      )
    )
  );


  constructor(private actions$: Actions, private statisticsService: StatisticsService) {
  }

}
