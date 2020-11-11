import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersStatistics, loadOrganizersStatisticsSuccess} from '../actions/organizers-statistics.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/errorSm';
import {of} from 'rxjs';


@Injectable()
export class OrganizersStatisticsEffects {

  organizersStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersStatistics),
      switchMap(
        (action) => this.statisticsService.getOrganizersStatistics(action.interval)
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
