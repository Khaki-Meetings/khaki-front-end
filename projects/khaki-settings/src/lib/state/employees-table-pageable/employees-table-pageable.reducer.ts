import {createReducer, on} from '@ngrx/store';
import {SortDirection} from '@angular/material/sort';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import { setEmployeesTablePageablesAction } from './employees-table-pageable.actions';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'employeesTablePageableReducer');

export const employeesTablePageableAttributeKey = 'employeesTablePageable';

export interface EmployeesTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState:EmployeesTablePageableSm = {
  page: 0,
  count: 5,
  sortColumn: 'person.lastName',
  sortDirection: 'asc'
};


export const employeesTablePageableReducer = createReducer(
  initialState,
  on(
    setEmployeesTablePageablesAction,
    (state, action) => {
      logger.debug('employeesTablePageableReducer');
      return {
        ...state,
        page: action.page ?? state.page,
        count: action.count ?? state.count,
        sortColumn: action.sortColumn ?? state.sortColumn,
        sortDirection: action.sortDirection ?? state.sortDirection
      };
    }
  )
);
