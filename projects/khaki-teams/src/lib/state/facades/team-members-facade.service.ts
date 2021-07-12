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

@Logging
@Injectable({
  providedIn: 'root'
})
export class TeamMembersFacadeService {

  constructor(private store: Store<TeamsFeatureSm>) {
  }

  dispatchLoadTeamMembers(): void {
    console.log("dispatchLoadTeamMembers()");
    this.store.dispatch(loadTeamMembersAction());
  }

  selectTeamMembers(): Observable<TeamMembersSm> {
    console.log("teamMembers: " + this.store.select(teamMembersSelector));
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

  selectAttendee(): Observable<boolean> {
    return this.store.select(teamMembersLoadingSelector);
  }

}
