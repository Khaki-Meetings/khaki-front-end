import {createReducer, on} from '@ngrx/store';
import { DepartmentsResponseDto } from '../../services/models/departmentsResponseDto';
import {loadDepartments, loadDepartmentsSuccess} from '../actions/departments.actions';

export const departmentsFeatureKey = 'departments';

export const initialState: DepartmentsResponseDto = {
  departments: []
};

export const departmentsReducer = createReducer(
  initialState,
  on(loadDepartments, (state: DepartmentsResponseDto, action) => state),
  on(
    loadDepartmentsSuccess,
    (state: DepartmentsResponseDto, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);

