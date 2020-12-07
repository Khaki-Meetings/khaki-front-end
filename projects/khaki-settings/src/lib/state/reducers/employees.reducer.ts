import {createReducer, on} from '@ngrx/store';
import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';
import {loadEmployees, loadEmployeesSuccess} from '../actions/employees.actions';

export const employeesFeatureKey = 'employees';

export const initialState: EmployeesResponseDto = {
  employees: []
};

export const employeesReducer = createReducer(
  initialState,
  on(loadEmployees, (state: EmployeesResponseDto, action) => state),
  on(
    loadEmployeesSuccess,
    (state: EmployeesResponseDto, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);

