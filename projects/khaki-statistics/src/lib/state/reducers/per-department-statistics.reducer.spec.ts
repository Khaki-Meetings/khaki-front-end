import {initialState, perDepartmentStatisticsReducer} from './per-department-statistics.reducer';
import {
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {DepartmentStatisticsSm} from '../models/department-statistics-sm';

describe('PerDepartmentStatistics Reducer', () => {
  describe('Load PerDepartmentStatistics', () => {
    it('should return the previous state', () => {
      const action = loadPerDepartmentStatistics();

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadPerDepartmentStatisticsSuccess.type}`, () => {
    it('should return the previous state', () => {
      const perDepartmentStatistics: DepartmentsStatisticsSm = {
        departmentsStatistics: [
          {
            department: 'Finance',
            totalSeconds: 1000,
            averageCost: 10993.00,
            totalCost: 1000323.43
          }
        ]
      };
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...perDepartmentStatistics});
    });
  });

  describe(`${loadPerDepartmentStatisticsFailure.type}`, () => {
    it('should return the previous state', () => {
      const perDepartmentStatistics = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as DepartmentsStatisticsSm;
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...perDepartmentStatistics});
    });
  });

});
