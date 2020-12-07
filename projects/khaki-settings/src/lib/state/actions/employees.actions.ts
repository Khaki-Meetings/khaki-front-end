import {createAction, props} from '@ngrx/store';
import {EmployeesResponseDto} from '../../services/models/employeesResponseDto';

export const loadEmployees = createAction(
  '[Employees] Load',
);

export const loadEmployeesSuccess = createAction(
  '[Employees] Load Success',
  props<EmployeesResponseDto>()
);