import {initialState, organizersStatisticsReducer} from './organizers-statistics.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadOrganizersStatisticsAction,
  loadOrganizersStatisticsFailureAction,
  loadOrganizersStatisticsSuccessAction
} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';

describe('OrganizersStatistics Reducer', () => {
  describe(`${loadOrganizersStatisticsAction.type}`, () => {
    it('should return the previous state', () => {
      const action = loadOrganizersStatisticsAction();

      const result = organizersStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadOrganizersStatisticsSuccessAction.type}`, () => {
    it('should return the new state', () => {
      const organizersStatistics: OrganizersStatisticsSm = {
        errors: [{}], organizersStatistics: [], page: 1
      };
      const action = loadOrganizersStatisticsSuccessAction(organizersStatistics);

      const result = organizersStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });

  describe(`${loadOrganizersStatisticsFailureAction.type}`, () => {
    it('should set error', () => {
      const organizersStatistics = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as OrganizersStatisticsSm;
      const action = loadOrganizersStatisticsFailureAction(organizersStatistics.errors[0]);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });
});
