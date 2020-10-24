import { organizersStatisticsReducer, initialState } from './organizers-statistics.reducer';

describe('OrganizersStatistics Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = organizersStatisticsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
