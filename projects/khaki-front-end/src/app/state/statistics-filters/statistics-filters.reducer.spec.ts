import {initialState, statisticsFiltersReducer} from './statistics-filters.reducer';

describe('StatisticsFilters Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = statisticsFiltersReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
