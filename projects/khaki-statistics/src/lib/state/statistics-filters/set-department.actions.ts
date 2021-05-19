import { createAction, props } from '@ngrx/store';
import { SetDepartmentActionProps } from './set-department-actions-props';

export const setDepartmentAction = createAction(
  '[Khaki Statistics] Set Department',
  props<SetDepartmentActionProps>()
);
