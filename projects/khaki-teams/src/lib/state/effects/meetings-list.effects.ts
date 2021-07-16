import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadMeetingsListAction, loadMeetingsListFailureAction, loadMeetingsListSuccessAction} from '../actions/meetings-list.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {MeetingsTablePageableFacade} from '../meetings-table-pageable/meetings-table-pageable-facade.service';
import {TypedAction} from '@ngrx/store/src/models';
import {MeetingsTablePageableSm} from '../meetings-table-pageable/meetings-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';
import { TeamsService } from '../../services/teams.service';
import { TeamsFiltersFacade } from '../team-filters/teams-filters-facade';
import { TeamsFiltersSm } from '../team-filters/teams-filters-sm';

@Logging
@Injectable()
export class MeetingsListEffects {
  private logger: HistorianService;

  meetingsListEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadMeetingsListAction),
      withLatestFrom(
        this.statisticsFiltersFacade.selectStatisticsFilters(),
        this.meetingsTablePageableFacade.selectMeetingsTablePageable(),
        this.teamsFiltersFacade.selectTeamsFilters()
      ),
      tap((thing) => this.logger.debug('thing meeting list x', thing)),
      switchMap(
        (joined: [TypedAction<'[TeamsMeetingsList] Load MeetingsList'>,
          StatisticsFiltersSm, MeetingsTablePageableSm, TeamsFiltersSm]) => {
          return this.teamsService
            .getMeetingsList(
              joined[1].start,
              joined[1].end,
              joined[1].organizer,
              joined[3].attendee,
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
                (error: ErrorSm) => of(loadMeetingsListFailureAction(error))
              )
            );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private meetingsTablePageableFacade: MeetingsTablePageableFacade,
    private teamsFiltersFacade: TeamsFiltersFacade
  ) {
  }

}
