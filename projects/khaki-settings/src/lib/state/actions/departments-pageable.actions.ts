import {createAction, props} from '@ngrx/store';
import { DepartmentsResponsePageableDto } from '../../services/models/departmentsResponseDto';

export const loadDepartmentsPageable = createAction(
  '[Departments Pageable] Load',
);

export const loadDepartmentsPageableSuccess = createAction(
  '[Departments Pageable] Load Success',
  props<DepartmentsResponsePageableDto>()
);
