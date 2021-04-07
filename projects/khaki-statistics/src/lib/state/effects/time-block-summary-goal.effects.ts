import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure,
   loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';
import * as momentJs from 'moment/moment';
import { loadTimeBlockSummaryGoals, loadTimeBlockSummaryGoalFailure, loadTimeBlockSummaryGoalSuccess } from '../actions/time-block-summary-goals.actions';

const moment = momentJs;

@Logging
@Injectable()
export class TimeBlockSummaryGoalEffects {
  logger: HistorianService;

  timeBlockSummaryGoalEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTimeBlockSummaryGoals),
      switchMap(() => this.statisticsFiltersFacade.selectStatisticsFilters()),
      switchMap(
        (statisticsFilters) => this.statisticsService
          .getTimeBlockSummaryGoals()
          .pipe(
            map(timeBlockSummary => loadTimeBlockSummaryGoalSuccess(timeBlockSummary)),
            catchError(
              (error: ErrorSm) => of(loadTimeBlockSummaryGoalFailure(error))
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
