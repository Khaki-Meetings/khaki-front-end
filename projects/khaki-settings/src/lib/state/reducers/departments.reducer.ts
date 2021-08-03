import { HistorianService, LogLevel } from '@natr/historian';
import {createReducer, on} from '@ngrx/store';
import { DepartmentsResponseDto } from '../../services/models/departmentsResponseDto';
import {loadDepartments, loadDepartmentsSuccess} from '../actions/departments.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'departmentsPageableReducer');

export const departmentsAttributeKey = 'departments';

export const initialState: DepartmentsResponseDto = {
  departments: []
};

export const departmentsReducer = createReducer(
  initialState,
  on(loadDepartments, (state: DepartmentsResponseDto, action) => state),
  on(
    loadDepartmentsSuccess,
    (state: DepartmentsResponseDto, action) => {
      logger.debug('departmentsReducer loadDepartmentsAction');
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);
