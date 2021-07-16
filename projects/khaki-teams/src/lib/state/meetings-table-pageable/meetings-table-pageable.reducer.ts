import {createReducer, on} from '@ngrx/store';
import {setMeetingsTablePageablesAction} from './meetings-table-pageable.actions';
import {SortDirection} from '@angular/material/sort';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'meetingsTablePageableReducer');

export const meetingsTablePageableAttributeKey = 'meetingsTablePageable';

export interface MeetingsTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState: MeetingsTablePageableSm = {
  page: 0,
  count: 5,
  sortColumn: 'start',
  sortDirection: 'asc'
};


export const meetingsTablePageableReducer = createReducer(
  initialState,
  on(
    setMeetingsTablePageablesAction,
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
