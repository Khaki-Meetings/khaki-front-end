import { createAction, props } from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export const setDepartmentsTablePageablesAction = createAction(
  '[DepartmentsTablePageable] Load DepartmentsTablePageables',
  props<PageableActionProps>()
);
