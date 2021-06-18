import { createAction, props } from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export const setTeamMembersTablePageablesAction = createAction(
  '[TeamMembersTablePageable] Load TeamMembersTablePageables',
  props<PageableActionProps>()
);
