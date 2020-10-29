import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';


export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatisticsSm = {
  bla: undefined
};


export const organizersStatisticsReducer = createReducer(
  initialState,
  on(loadOrganizersStatistics, (state: OrganizersStatisticsSm, action) => state),
);

