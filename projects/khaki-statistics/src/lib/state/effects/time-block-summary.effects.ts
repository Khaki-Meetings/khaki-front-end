import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ErrorSm} from '../models/errorSm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable()
export class TimeBlockSummaryEffects {
  logger: HistorianService;

  timeBlockSummaryEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTimeBlockSummary),
      switchMap(
        (action) => this.statisticsService.getTimeBlockSummary(action.interval)
          .pipe(
            map(timeBlockSummary => loadTimeBlockSummarySuccess(timeBlockSummary)),
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
