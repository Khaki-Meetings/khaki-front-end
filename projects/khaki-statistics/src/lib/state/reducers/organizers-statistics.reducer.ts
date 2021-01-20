import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatisticsAction, loadOrganizersStatisticsSuccessAction} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {HistorianService, LogLevel} from '@natr/historian';
import {loadTrailingStatisticsFailure} from '../actions/trailing-statistics.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'OrganizersStatisticsReducer');

export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatisticsSm = {
  content: [],
  number: 0,
  loading: false
};

export const organizersStatisticsReducer = createReducer(
  initialState,
  on(
    loadOrganizersStatisticsAction,
    (state: OrganizersStatisticsSm, action) => {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadTrailingStatisticsFailure,
    (state, action) => {
      const newState = {...state};
      newState.error = {...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadOrganizersStatisticsSuccessAction,
    (state: OrganizersStatisticsSm, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.content = newState.content.map(
        organizersStatistic => {
          return {
            organizerFirstName: organizersStatistic.organizerFirstName,
            organizerLastName: organizersStatistic.organizerLastName,
            totalCost: organizersStatistic.totalCost,
            totalMeetings: organizersStatistic.totalMeetings,
            totalSeconds: organizersStatistic.totalSeconds,
            organizerEmail: organizersStatistic.organizerEmail
          };
        }
      );
      newState.loading = false;
      return newState;
    }
  ),
);
