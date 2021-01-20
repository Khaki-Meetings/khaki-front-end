import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics, loadPerDepartmentStatisticsSuccess} from '../actions/per-department-statistics.actions';
import {StatisticsService} from '../../services/statistics.service';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';


@Injectable()
export class PerDepartmentStatisticsEffects {
  perDepartmentStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPerDepartmentStatistics),
      mergeMap(() => this.statisticsFiltersFacade.selectStatisticsFilters()),
      switchMap(
        (action) => this.statisticsService
          .getDepartmentStatistics(action.start, action.end, {statisticsScope: action.statisticsScope})
          .pipe(
            map((departmentStatistics) => loadPerDepartmentStatisticsSuccess(departmentStatistics)),
            catchError(
              (error: ErrorSm) => of(loadTimeBlockSummaryFailure(error))
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
