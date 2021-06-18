import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';

import * as TeamMemberTablePageableActions from './team-members-table-pageable.actions';
import { loadTeamMembersAction } from '../actions/team-members.actions';


@Injectable()
export class TeamMembersTablePageableEffects {

  loadTeamMemberTablePageables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamMemberTablePageableActions.setTeamMembersTablePageablesAction),
      map(() => loadTeamMembersAction())
    );
  });

  constructor(private actions$: Actions) {
  }

}
