import {createReducer, on} from '@ngrx/store';
import {setOrganizersTablePageablesAction} from './organizers-table-pageable.actions';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';

export const organizersTablePageableAttributeKey = 'organizersTablePageable';

export interface OrganizersTablePageableSm {
  page: number;
  count: number;
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
      ({...state, page: action.page, count: action.count})
  )
);

