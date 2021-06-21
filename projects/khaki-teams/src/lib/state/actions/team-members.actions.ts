import {createAction, props} from '@ngrx/store';
import {TeamMembersSm} from '../models/team-members-sm';
import {ErrorSm} from '../models/error-sm';

export const loadTeamMembersAction = createAction(
  '[TeamMembers] Load TeamMembers',
);

export const loadTeamMembersSuccessAction = createAction(
  '[TeamMembers] Load TeamMembers Success',
  props<TeamMembersSm>()
);

export const loadTeamMembersFailureAction = createAction(
  '[TeamMembers] Load TeamMembers Failure',
  props<ErrorSm>()
);
