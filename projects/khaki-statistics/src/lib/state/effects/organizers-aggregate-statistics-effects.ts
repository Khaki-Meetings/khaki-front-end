import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersAggregateStatisticsAction, loadOrganizersAggregateStatisticsSuccessAction} from '../actions/organizers-aggregate-statistics.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersTablePageableFacade} from '../organizers-table-pageable/organizers-table-pageable-facade.service';
import {TypedAction} from '@ngrx/store/src/models';
import {OrganizersTablePageableSm} from '../organizers-table-pageable/organizers-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';

@Logging
@Injectable()
export class OrganizersAggregateStatisticsEffects {
  private logger: HistorianService;

  organizersAggregateStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersAggregateStatisticsAction),
      withLatestFrom(
        this.statisticsFiltersFacade.selectStatisticsFilters(),
        this.organizersTablePageableFacade.selectOrganizersTablePageable(),
                this.statisticsFiltersFacade.selectDepartment()
      ),
      tap((thing) => this.logger.debug('organizers agg thing', thing)),
      switchMap(
        (joined: [TypedAction<'[OrganizersAggregateStatistics] Load OrganizersAggregateStatistics'>, StatisticsFiltersSm, OrganizersTablePageableSm, string]) => {
          console.log('organizers agg joined', joined); // was natr-historian  this.logger.debug
          return this.statisticsService
            .getAggregateOrganizersStatistics(
              joined[1].start,
              joined[1].end,
              {
                statisticsScope: joined[1].statisticsScope,
                page: joined[2].page,
                count: joined[2].count,
                sortDirection: joined[2].sortDirection,
                sortColumn: joined[2].sortColumn,
                department: joined[3]
              }
            )
            .pipe(
              map(organizersStatistics => loadOrganizersAggregateStatisticsSuccessAction(organizersStatistics)),
              catchError(
                (error: ErrorSm) => of(loadTimeBlockSummaryFailure(error))
              )
            );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private organizersTablePageableFacade: OrganizersTablePageableFacade
  ) {
  }

}
