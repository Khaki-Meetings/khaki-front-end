import {initialState, organizersAggregateStatisticsReducer} from './organizers-aggregate-statistics.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadOrganizersStatisticsAction,
  loadOrganizersStatisticsFailureAction,
  loadOrganizersStatisticsSuccessAction
} from '../actions/organizers-statistics.actions';
import {OrganizersAggregateStatisticsSm} from '../models/organizers-aggregate-statistics-sm';
import { loadOrganizersAggregateStatisticsAction, loadOrganizersAggregateStatisticsSuccessAction } from '../actions/organizers-aggregate-statistics.actions';

describe('OrganizersStatistics Reducer', () => {
  describe(`${loadOrganizersStatisticsAction.type}`, () => {
    it('should return the previous state', () => {
      const action = loadOrganizersAggregateStatisticsAction();

      const result = organizersAggregateStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadOrganizersStatisticsSuccessAction.type}`, () => {
    it('should return the new state', () => {
      const organizersStatistics: OrganizersAggregateStatisticsSm = {
      };
      const action = loadOrganizersAggregateStatisticsSuccessAction(organizersStatistics);

      const result = organizersAggregateStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });

  describe(`${loadOrganizersStatisticsFailureAction.type}`, () => {
    it('should set error', () => {
      const organizersStatistics = {
        errors: [
          {message: 'you done messed up', name: '1d10t'}
        ]
      } as OrganizersAggregateStatisticsSm;
      const action = loadOrganizersStatisticsFailureAction(organizersStatistics.error);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });
});
