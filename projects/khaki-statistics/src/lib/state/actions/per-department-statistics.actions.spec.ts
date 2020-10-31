import * as fromPerDepartmentStatistics from './per-department-statistics.actions';

describe('loadPerDepartmentStatistics', () => {
  it('should return an action', () => {
    expect(fromPerDepartmentStatistics.loadPerDepartmentStatistics().type).toBe('[PerDepartmentStatistics] Load PerDepartmentStatistics');
  });
});
