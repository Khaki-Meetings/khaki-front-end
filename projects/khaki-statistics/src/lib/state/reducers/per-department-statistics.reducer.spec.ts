import {initialState, perDepartmentStatisticsReducer} from './per-department-statistics.reducer';

describe('PerDepartmentStatistics Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
