import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrganizersStatisticsAction, loadOrganizersStatisticsSuccessAction} from '../actions/organizers-statistics.actions';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/error-sm';
import {forkJoin, Observable, of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacadeService} from '../facades/statistics-filters-facade.service';
import {IntervalEnum} from '../../services/models/interval.enum';
import {OrganizersTablePageableFacade} from '../organizers-table-pageable/organizers-table-pageable-facade.service';
import {flatMap} from 'rxjs/internal/operators';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from '../index';
import {StatisticsFiltersSm} from '../reducers/statistics-filters.reducer';
import {PageableActionProps} from '../models/action-props/pageable-action-props';
import {TypedAction} from '@ngrx/store/src/models';
import {OrganizersTablePageableSm} from '../organizers-table-pageable/organizers-table-pageable.reducer';

@Logging
@Injectable()
export class OrganizersStatisticsEffects {
  private logger: HistorianService;


  organizersStatisticsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrganizersStatisticsAction),
      withLatestFrom(
        this.statisticsFiltersFacade.statisticsFilters(),
        this.organizersTablePageableFacade.pageable()
      ),
      tap((thing) => this.logger.debug('thing', thing)),
      switchMap(
        (joined: [TypedAction<'[OrganizersStatistics] Load OrganizersStatistics'>, StatisticsFiltersSm, OrganizersTablePageableSm]) => {
          this.logger.debug('joined', joined);
          return this.statisticsService
            .getOrganizersStatistics(
              IntervalEnum[joined[1].interval],
              {
                filter: joined[1].filter,
                page: joined[2].page,
                count: joined[2].count
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
    private statisticsFiltersFacade: StatisticsFiltersFacadeService,
    private organizersTablePageableFacade: OrganizersTablePageableFacade
  ) {
  }

}
