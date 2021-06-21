import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {setTeamMembersTablePageablesAction} from './team-members-table-pageable.actions';
import {Observable} from 'rxjs';
import {TeamMembersTablePageableSm} from './team-members-table-pageable.reducer';
import {selectTeamMembersTablePageableState} from './team-members-table-pageable.selectors';
import {SortDirection} from '@angular/material/sort';
import { TeamsFeatureSm } from '../teams-feature-sm';

@Injectable({providedIn: 'root'})
export class TeamMembersTablePageableFacade {

  constructor(private store: Store<TeamsFeatureSm>) {
  }

  public dispatchSetTeamMembersTablePageables(page: number, count: number, sortColumn?: string, sortDirection?: SortDirection): void {
    this.store.dispatch(setTeamMembersTablePageablesAction({page, count, sortColumn, sortDirection}));
  }

  public selectTeamMembersTablePageable(): Observable<TeamMembersTablePageableSm> {
    return this.store.select(selectTeamMembersTablePageableState);
  }
}
