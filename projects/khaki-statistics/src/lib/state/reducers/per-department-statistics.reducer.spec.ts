import {initialState, perDepartmentStatisticsReducer} from './per-department-statistics.reducer';
import {
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';

describe('PerDepartmentStatistics Reducer', () => {
  describe('Load PerDepartmentStatistics', () => {
    it('should return the previous state', () => {
      const action = loadPerDepartmentStatistics();

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadPerDepartmentStatisticsSuccess.type}`, () => {
    it('should return state with department stats', () => {
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
    it('should return error', () => {
      const perDepartmentStatistics: DepartmentsStatisticsSm = {
        departmentsStatistics: [],
        error:
          {message: 'you done messed up', name: '1d10t'}
      };
      const action = loadPerDepartmentStatisticsFailure({message: 'you done messed up', name: '1d10t'});

      const result = perDepartmentStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...perDepartmentStatistics});
    });
  });

});
