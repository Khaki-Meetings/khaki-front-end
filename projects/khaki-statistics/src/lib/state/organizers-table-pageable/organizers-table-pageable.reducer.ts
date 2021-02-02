import {createReducer, on} from '@ngrx/store';
import {setOrganizersTablePageablesAction} from './organizers-table-pageable.actions';
import {SortDirection} from '@angular/material/sort';

export const organizersTablePageableAttributeKey = 'organizersTablePageable';

export interface OrganizersTablePageableSm {
  page: number;
  count: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

export const initialState: OrganizersTablePageableSm = {
  page: 0,
  count: 10
};


export const organizersTablePageableReducer = createReducer(
  initialState,
  on(
    setOrganizersTablePageablesAction,
    (state, action) =>
      ({...state, page: action.page, count: action.count, sortColumn: action.sortColumn, sortDirection: action.sortDirection})
  )
);

