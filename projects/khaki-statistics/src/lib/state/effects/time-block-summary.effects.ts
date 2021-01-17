import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {IntervalEnum} from '../../services/models/interval.enum';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';

@Logging
@Injectable()
export class TimeBlockSummaryEffects {
  logger: HistorianService;

  timeBlockSummaryEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTimeBlockSummary),
      switchMap(() => this.statisticsFiltersFacade.statisticsFilters()),
      tap(ting => {
        this.logger.debug('thing', ting);
      }),
      switchMap(
        (action) => this.statisticsService.getTimeBlockSummary(IntervalEnum[action.interval], {...action})
          .pipe(
            map(timeBlockSummary => loadTimeBlockSummarySuccess(timeBlockSummary)),
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
