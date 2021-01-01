import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersStatistics, loadOrganizersStatisticsSuccess} from '../actions/organizers-statistics.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacadeService} from '../facades/statistics-filters-facade.service';
import {IntervalEnum} from '../../services/models/interval.enum';

@Logging
@Injectable()
export class OrganizersStatisticsEffects {
  private logger: HistorianService;

  organizersStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersStatistics),
      mergeMap(() => this.statisticsFiltersFacade.statisticsFilters()),
      switchMap(
        (statisticsFilters) => this.statisticsService
          .getOrganizersStatistics(IntervalEnum[statisticsFilters.interval] , {...statisticsFilters})
          .pipe(
            map(organizersStatistics => loadOrganizersStatisticsSuccess(organizersStatistics)),
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
