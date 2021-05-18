import {createAction, props} from '@ngrx/store';
import { DepartmentsListSm } from '../models/departments-list-sm';
import {ErrorSm} from '../models/error-sm';

export const loadDepartmentsListAction = createAction(
  '[DepartmentsList] Load DepartmentsList',
);

export const loadDepartmentsListSuccessAction = createAction(
  '[DepartmentsList] Load DepartmentsList Success',
  props<DepartmentsListSm>()
);

export const loadDepartmentsListFailureAction = createAction(
  '[DepartmentsList] Load DepartmentsList Failure',
  props<ErrorSm>()
);
