import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';

export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatisticsSm = {
  page: 1,
  organizers: [
    {
      organizer: {
        name: 'megan',
        email: 'megan@s56.net',
        imageUrl: 'www.google.com'
      },
      totalMeetings: 1,
      totalHours: 2,
      totalCost: 1
    }],
  errors: [
    {message: 'not valid'},
    {message: 'error two'},
  ]
};

export const organizersStatisticsReducer = createReducer(
  initialState,
  on(loadOrganizersStatistics, (state: OrganizersStatisticsSm, action) => state),
);

