import { createAction, props } from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export const setOrganizersTablePageablesAction = createAction(
  '[OrganizersTablePageable] Load OrganizersTablePageables',
  props<PageableActionProps>()
);




