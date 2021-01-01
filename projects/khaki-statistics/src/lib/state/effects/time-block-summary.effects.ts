import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacadeService} from '../facades/statistics-filters-facade.service';
import {IntervalEnum} from '../../services/models/interval.enum';

@Logging
@Injectable()
export class TimeBlockSummaryEffects {
  logger: HistorianService;

  timeBlockSummaryEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTimeBlockSummary),
      mergeMap(() => this.statisticsFiltersFacade.statisticsFilters()),
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
    private statisticsFiltersFacade: StatisticsFiltersFacadeService
  ) {
  }

}
