import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersStatistics, loadOrganizersStatisticsSuccess} from '../actions/organizers-statistics.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/errorSm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable()
export class OrganizersStatisticsEffects {
  private logger: HistorianService;

  organizersStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersStatistics),
      switchMap(
        (action) => this.statisticsService.getOrganizersStatistics(action.interval, action.count, action.page)
          .pipe(
            map(organizersStatistics => loadOrganizersStatisticsSuccess(organizersStatistics)),
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
