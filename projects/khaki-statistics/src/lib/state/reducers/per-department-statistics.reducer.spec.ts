import {initialState, perDepartmentStatisticsReducer} from './per-department-statistics.reducer';
import {
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {PerDepartmentStatisticsSm} from '../models/per-department-statistics-sm';
import {DepartmentStatisticsSm} from '../models/department-statistics-sm';
import {DepartmentSm} from '../models/departmentSm';

describe('PerDepartmentStatistics Reducer', () => {
  describe('Load PerDepartmentStatistics', () => {
    it('should return the previous state', () => {
      const action = loadPerDepartmentStatistics();

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`${loadPerDepartmentStatisticsSuccess.type}`, () => {
    it('should return the previous state', () => {
      const perDepartmentStatistics = {
        departmentStatistics: {
          department: {
            name: 'Finance'
          } as DepartmentSm,
          totalHours: 1000,
          averageCost: 10993.00,
          totalCost: 1000323.43
        } as DepartmentStatisticsSm
      } as PerDepartmentStatisticsSm;
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toBe({...initialState, ...perDepartmentStatistics});
    });
  });

  describe(`${loadPerDepartmentStatisticsFailure.type}`, () => {
    it('should return the previous state', () => {
      const perDepartmentStatistics = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as PerDepartmentStatisticsSm;
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toBe({...initialState, ...perDepartmentStatistics});
    });
  });

});
