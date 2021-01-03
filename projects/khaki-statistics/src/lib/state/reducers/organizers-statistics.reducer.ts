import {createReducer, on} from '@ngrx/store';
import {loadOrganizersStatistics, loadOrganizersStatisticsSuccess} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {Utilities} from '../../services/utilities';
import {HistorianService, LogLevel} from '@natr/historian';

const logger = new HistorianService(LogLevel.DEBUG, 'OrganizersStatisticsReducer');

export const organizersStatisticsFeatureKey = 'organizersStatistics';

export const initialState: OrganizersStatisticsSm = {
  errors: [], content: [], number: 0

};

export const organizersStatisticsReducer = createReducer(
  initialState,
  on(loadOrganizersStatistics, (state: OrganizersStatisticsSm, action) => state),
  on(
    loadOrganizersStatisticsSuccess,
    (state: OrganizersStatisticsSm, action) => {
      logger.debug('state', state);
      const {type, ...newState} = {...state, ...action};
      logger.debug('newState, type', newState, type);
      newState.content = newState.content.map(
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
      logger.debug('newNewState', newState);
      return state;
    }
  ),
);
