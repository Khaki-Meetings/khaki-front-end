import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamMembersSm} from '../models/team-members-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {TeamsFeatureSm} from '../teams-feature-sm';
import {Store} from '@ngrx/store';
import {loadTeamMembersAction} from '../actions/team-members.actions';
import {teamMembersLoadingSelector, teamMembersSelector } from '../teams.selectors';
import { Logging } from '@natr/historian';
import { setAttendeeAction } from '../team-filters/set-attendee.actions';
import { TeamsFiltersSm } from '../team-filters/teams-filters-sm';
import { teamsAttendeeSelector, teamsFiltersSelector } from '../team-filters/teams-filters.selectors';

@Logging
@Injectable({
  providedIn: 'root'
})
export class TeamMembersFacadeService {

  constructor(private store: Store<TeamsFeatureSm>) {
  }

  dispatchLoadTeamMembers(): void {
    this.store.dispatch(loadTeamMembersAction());
  }

  selectTeamMembers(): Observable<TeamMembersSm> {
    return this.store.select(teamMembersSelector);
  }

  selectTeamMembersLoading(): Observable<boolean> {
    return this.store.select(teamMembersLoadingSelector);
  }

  setTeamMembers(data: TeamMembersSm): void {
    throw new NotImplementedException();
  }

  public dispatchSetAttendee(attendee: string): void {
    this.store.dispatch(setAttendeeAction({attendee}));
  }

  public selectTeamsFilters(): Observable<TeamsFiltersSm> {
    return this.store.select(teamsFiltersSelector);
  }

  public selectAttendee(): Observable<string> {
    return this.store.select(teamsAttendeeSelector);
  }

}
