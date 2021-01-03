import { setStatisticsFilterReducer, initialState } from './statistics-filters.reducer';

describe('StatisticsFilters Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = setStatisticsFilterReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
