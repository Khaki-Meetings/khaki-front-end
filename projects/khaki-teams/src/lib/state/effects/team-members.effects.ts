import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {TeamsService} from '../../services/teams.service';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {TypedAction} from '@ngrx/store/src/models';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {StatisticsFiltersFacade} from '../statistics-filters/statistics-filters-facade';
import { loadTeamMembersAction, loadTeamMembersFailureAction, loadTeamMembersSuccessAction } from '../actions/team-members.actions';
import { TeamMembersTablePageableSm } from '../team-members-table-pageable/team-members-table-pageable.reducer';
import { TeamMembersTablePageableFacade } from '../team-members-table-pageable/team-members-table-pageable-facade.service';
import { setAttendeeAction } from '../team-filters/set-attendee.actions';
import { setTeamsFiltersAction } from '../team-filters/set-teams-filters.actions';

@Logging
@Injectable()
export class TeamMembersEffects {
  private logger: HistorianService;

  teamMembersEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTeamMembersAction),
      withLatestFrom(
        this.statisticsFiltersFacade.selectStatisticsFilters(),
        this.teamMembersTablePageableFacade.selectTeamMembersTablePageable()
      ),
      tap((thing) => this.logger.debug('teamMembers thing ', thing)),
      switchMap(
        (joined: [TypedAction<'[TeamMembers] Load TeamMembers'>, StatisticsFiltersSm, TeamMembersTablePageableSm]) => {
          return this.teamsService
            .getEmployees(
              joined[1].start,
              joined[1].end,
              {
                statisticsScope: joined[1].statisticsScope,
                department: joined[1].department,
                page: joined[2].page,
                count: joined[2].count,
                sortDirection: joined[2].sortDirection,
                sortColumn: joined[2].sortColumn
              }
            )
            .pipe(
              map(teamMembers => loadTeamMembersSuccessAction(teamMembers)),
              catchError(
                (error: ErrorSm) => of(loadTeamMembersFailureAction(error))
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
    private teamMembersTablePageableFacade: TeamMembersTablePageableFacade
  ) {
  }

  teamsSetAttendeeEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setAttendeeAction),
      map(action => {
        return setTeamsFiltersAction({attendee: action.attendee});
      }),
    )
  );

}
