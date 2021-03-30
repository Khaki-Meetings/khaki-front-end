import {createReducer, on} from '@ngrx/store';
import {HistorianService, LogLevel} from '@natr/historian';
import { OrganizersAggregateStatisticsSm } from '../models/organizers-aggregate-statistics-sm';
import { loadOrganizersAggregateStatisticsAction, loadOrganizersAggregateStatisticsFailureAction, loadOrganizersAggregateStatisticsSuccessAction } from '../actions/organizers-aggregate-statistics.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'OrganizersAggregateStatisticsReducer');

export const organizersAggregateStatisticsFeatureKey = 'organizersAggregateStatistics';

export const initialState: OrganizersAggregateStatisticsSm = {
  content: [],
  number: 0,
  loading: false
};

export const organizersAggregateStatisticsReducer = createReducer(
  initialState,
  on(
    loadOrganizersAggregateStatisticsAction,
    (state: OrganizersAggregateStatisticsSm, action) => {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadOrganizersAggregateStatisticsFailureAction,
    (state, action) => {
      const newState = {...state};
      newState.error = {...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadOrganizersAggregateStatisticsSuccessAction,
    (state: OrganizersAggregateStatisticsSm, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.content = newState.content.map(
        organizersStatistic => {
          return {
            organizerId: organizersStatistic.organizerId,
            organizerFirstName: organizersStatistic.organizerFirstName,
            organizerLastName: organizersStatistic.organizerLastName,
            organizerAvatarUrl:  organizersStatistic.organizerAvatarUrl,
            organizerEmail: organizersStatistic.organizerEmail,
            internalMeetingCount: organizersStatistic.internalMeetingCount,
            internalMeetingSeconds: organizersStatistic.internalMeetingSeconds,
            externalMeetingCount: organizersStatistic.externalMeetingCount,
            externalMeetingSeconds: organizersStatistic.externalMeetingSeconds
          };
        }
      );
      newState.loading = false;
      return newState;
    }
  ),
);
