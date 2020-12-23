import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatistics, loadOrganizersStatisticsSuccess} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {Utilities} from '../../services/utilities';

export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatisticsSm = {
  errors: [], organizersStatistics: [], page: 0

};


export const organizersStatisticsReducer = createReducer(
  initialState,
  on(loadOrganizersStatistics, (state: OrganizersStatisticsSm, action) => state),
  on(
    loadOrganizersStatisticsSuccess,
    (state: OrganizersStatisticsSm, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.organizersStatistics = newState.organizersStatistics.map(
        organizersStatistic => {
          return {
            organizerFirstName: organizersStatistic.organizerFirstName,
            organizerLastName: organizersStatistic.organizerLastName,
            totalCost: organizersStatistic.totalCost,
            totalMeetings: organizersStatistic.totalMeetings,
            totalSeconds: organizersStatistic.totalSeconds,
            formattedTime: Utilities.formatHrsMins(organizersStatistic.totalSeconds),
            organizerEmail: organizersStatistic.organizerEmail
          };
        }
      );
      return newState;
    }
  ),
);
