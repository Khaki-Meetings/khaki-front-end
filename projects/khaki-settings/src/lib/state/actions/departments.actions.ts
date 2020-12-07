import {createAction, props} from '@ngrx/store';
import {DepartmentsResponseDto} from '../../services/models/departmentsResponseDto';

export const loadDepartments = createAction(
  '[Departments] Load',
);

export const loadDepartmentsSuccess = createAction(
  '[Departments] Load Success',
  props<DepartmentsResponseDto>()
);