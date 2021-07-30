import {createReducer, on} from '@ngrx/store';
import {SortDirection} from '@angular/material/sort';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import { setDepartmentsTablePageablesAction } from './departments-table-pageable.actions';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'departmentsTablePageableReducer');

export const departmentsTablePageableAttributeKey = 'departmentsTablePageable';

export const departmentsTableAttributeKey = 'departmentsTable';


export interface DepartmentsTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState:DepartmentsTablePageableSm = {
  page: 0,
  count: 10,
  sortColumn: 'name',
  sortDirection: 'asc'
};


export const departmentsTablePageableReducer = createReducer(
  initialState,
  on(
    setDepartmentsTablePageablesAction,
    (state, action) => {
      logger.debug('departmentsTablePageableReducer');
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
