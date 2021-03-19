import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadMeetingsListAction, loadMeetingsListSuccessAction} from '../actions/meetings-list.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StatisticsService} from '../../services/statistics.service';
import {loadTimeBlockSummaryFailure} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {MeetingsTablePageableFacade} from '../meetings-table-pageable/meetings-table-pageable-facade.service';
import {TypedAction} from '@ngrx/store/src/models';
import {MeetingsTablePageableSm} from '../meetings-table-pageable/meetings-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';

@Logging
@Injectable()
export class MeetingsListEffects {
  private logger: HistorianService;

  meetingsListEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadMeetingsListAction),
      withLatestFrom(
        this.statisticsFiltersFacade.selectStatisticsFilters(),
        this.meetingsTablePageableFacade.selectMeetingsTablePageable()
      ),
      tap((thing) => this.logger.debug('thing meeting list', thing)),
      switchMap(
        (joined: [TypedAction<'[MeetingsList] Load MeetingsList'>, StatisticsFiltersSm, MeetingsTablePageableSm]) => {
          console.log('joined', joined); // was natr-historian  this.logger.debug
          return this.statisticsService
            .getMeetingsList(
              joined[1].start,
              joined[1].end,
              joined[1].organizer,
              {
                statisticsScope: joined[1].statisticsScope,
                page: joined[2].page,
                count: joined[2].count,
                sortDirection: joined[2].sortDirection,
                sortColumn: joined[2].sortColumn
              }
            )
            .pipe(
              map(meetingsList => loadMeetingsListSuccessAction(meetingsList)),
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
    private meetingsTablePageableFacade: MeetingsTablePageableFacade
  ) {
  }

}
