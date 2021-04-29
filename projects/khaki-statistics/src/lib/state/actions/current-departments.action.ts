import {createAction, props} from '@ngrx/store';
import { DepartmentSm } from '../models/department-sm';

export interface SetCurrentDepartmentActionProp {
  department: DepartmentSm;
}

export const setCurrentDepartmentAction = createAction(
  '[CurrentDepartment] Set CurrentDepartment',
  props<SetCurrentDepartmentActionProp>()
);
