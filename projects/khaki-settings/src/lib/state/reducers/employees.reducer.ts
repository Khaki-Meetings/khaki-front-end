import { HistorianService, LogLevel } from '@natr/historian';
import {createReducer, on} from '@ngrx/store';
import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';
import {loadEmployees, loadEmployeesSuccess} from '../actions/employees.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'EmployeesReducer');

export const employeesAttributeKey = 'employees';

export const initialState: EmployeesResponseDto = {
    content: [],
    number: 0,
    loading: false
};

export const employeesReducer = createReducer(
  initialState,
  on(loadEmployees,
    (state: EmployeesResponseDto, action) => {
      logger.debug('employeesReducer loadEmployeesAction');
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadEmployeesSuccess,
    (state: EmployeesResponseDto, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.loading = false;
      return newState;
    }
  )
);
