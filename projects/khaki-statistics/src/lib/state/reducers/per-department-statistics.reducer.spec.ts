import {initialState, perDepartmentStatisticsReducer} from './per-department-statistics.reducer';
import {
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {DepartmentStatisticsSm} from '../models/department-statistics-sm';
import { DepartmentsStatisticsAggSm } from '../models/departments-statistics-agg-sm';

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
      const perDepartmentStatistics: DepartmentsStatisticsAggSm = {
        internal: {
          departmentsStatistics: [
            {
              department: 'Finance',
              totalSeconds: 1000,
              averageCost: 10993.00,
              totalCost: 1000323.43
            }
          ]
        },
        external: {
          departmentsStatistics: [
            {
              department: 'Finance',
              totalSeconds: 1000,
              averageCost: 10993.00,
              totalCost: 1000323.43
            }
          ]
        }
      };
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...perDepartmentStatistics});
    });
  });

  describe(`${loadPerDepartmentStatisticsFailure.type}`, () => {
    it('should return the previous state', () => {
      const perDepartmentStatistics = {
        error: {message: 'error message', name: 'error name'}
      } as DepartmentsStatisticsAggSm;
      const action = loadPerDepartmentStatisticsSuccess(perDepartmentStatistics);

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...perDepartmentStatistics});
    });
  });

});
