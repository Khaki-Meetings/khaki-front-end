import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {OrganizersStatistics} from '../models/organizers-statistics';


export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatistics = {
  bla: undefined
};


export const organizersStatisticsReducer = createReducer(
  initialState,
  on(loadOrganizersStatistics, (state: OrganizersStatistics, action) => state),
);

