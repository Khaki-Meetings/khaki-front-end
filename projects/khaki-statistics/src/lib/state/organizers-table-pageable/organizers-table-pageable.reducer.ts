import {createReducer, on} from '@ngrx/store';
import {setOrganizersTablePageablesAction} from './organizers-table-pageable.actions';
import {SortDirection} from '@angular/material/sort';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'organizersTablePageableReducer');

export const organizersTablePageableAttributeKey = 'organizersTablePageable';

export interface OrganizersTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState: OrganizersTablePageableSm = {
  page: 0,
  count: 5,
  sortColumn: 'totalMeetings',
  sortDirection: 'desc'
};


export const organizersTablePageableReducer = createReducer(
  initialState,
  on(
    setOrganizersTablePageablesAction,
    (state, action) => {
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

