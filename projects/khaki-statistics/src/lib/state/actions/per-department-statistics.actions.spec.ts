import * as fromPerDepartmentStatistics from './per-department-statistics.actions';

describe('loadPerDepartmentStatisticss', () => {
  it('should return an action', () => {
    expect(fromPerDepartmentStatistics.loadPerDepartmentStatistics().type).toBe('[PerDepartmentStatistics] Load PerDepartmentStatisticss');
  });
});
