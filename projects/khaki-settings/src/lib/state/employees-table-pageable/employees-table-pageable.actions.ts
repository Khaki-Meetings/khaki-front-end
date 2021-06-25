import { createAction, props } from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export const setEmployeesTablePageablesAction = createAction(
  '[EmployeesTablePageable] Load EmployeesTablePageables',
  props<PageableActionProps>()
);
