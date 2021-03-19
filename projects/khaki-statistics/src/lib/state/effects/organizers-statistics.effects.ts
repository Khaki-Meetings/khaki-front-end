import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersStatisticsAction, loadOrganizersStatisticsSuccessAction} from '../actions/organizers-statistics.actions';
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
export class OrganizersStatisticsEffects {
  private logger: HistorianService;

  organizersStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersStatisticsAction),
      withLatestFrom(
        this.statisticsFiltersFacade.selectStatisticsFilters(),
        this.organizersTablePageableFacade.selectOrganizersTablePageable()
      ),
      tap((thing) => this.logger.debug('thing', thing)),
      switchMap(
        (joined: [TypedAction<'[OrganizersStatistics] Load OrganizersStatistics'>, StatisticsFiltersSm, OrganizersTablePageableSm]) => {
          console.log('joined', joined); // was natr-historian  this.logger.debug
          return this.statisticsService
            .getOrganizersStatistics(
              joined[1].start,
              joined[1].end,
              {
                statisticsScope: joined[1].statisticsScope,
                page: joined[2].page,
                count: joined[2].count,
                sortDirection: joined[2].sortDirection,
                sortColumn: joined[2].sortColumn
              }
            )
            .pipe(
              map(organizersStatistics => loadOrganizersStatisticsSuccessAction(organizersStatistics)),
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
