import {createReducer, on} from '@ngrx/store';
import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';
import {loadEmployees, loadEmployeesSuccess} from '../actions/employees.actions';

export const employeesAttributeKey = 'employees';

export const initialState: EmployeesResponseDto = {
    content: [],
    number: 0,
    loading: false
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
