import {createReducer, on} from '@ngrx/store';
import {setTeamMembersTablePageablesAction} from './team-members-table-pageable.actions';
import {SortDirection} from '@angular/material/sort';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'teamMembersTablePageableReducer');

export const teamMembersTablePageableAttributeKey = 'teamMembersTablePageable';

export interface TeamMembersTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState: TeamMembersTablePageableSm = {
  page: 0,
  count: 5,
  sortColumn: 'person.lastName',
  sortDirection: 'asc'
};


export const teamMembersTablePageableReducer = createReducer(
  initialState,
  on(
    setTeamMembersTablePageablesAction,
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
