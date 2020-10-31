import {initialState, organizersStatisticsReducer} from './organizers-statistics.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadOrganizersStatistics,
  loadOrganizersStatisticsFailure,
  loadOrganizersStatisticsSuccess
} from '../actions/organizers-statistics.actions';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';

describe('OrganizersStatistics Reducer', () => {
  describe(`${loadOrganizersStatistics.type}`, () => {
    it('should return the previous state', () => {
      const action = loadOrganizersStatistics();

      const result = organizersStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadOrganizersStatisticsSuccess.type}`, () => {
    it('should return the new state', () => {
      const organizersStatistics: OrganizersStatisticsSm = {
        errors: [{}], organizers: [], page: 1
      };
      const action = loadOrganizersStatisticsSuccess(organizersStatistics);

      const result = organizersStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });

  describe(`${loadOrganizersStatisticsFailure.type}`, () => {
    it('should set error', () => {
      const organizersStatistics = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as OrganizersStatisticsSm;
      const action = loadOrganizersStatisticsFailure(organizersStatistics.errors[0]);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...organizersStatistics});
    });
  });
});
