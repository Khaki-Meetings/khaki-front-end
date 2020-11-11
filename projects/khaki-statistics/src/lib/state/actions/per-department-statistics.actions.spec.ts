import * as fromPerDepartmentStatistics from './per-department-statistics.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadPerDepartmentStatistics', () => {
  it('should return an action', () => {
    expect(fromPerDepartmentStatistics.loadPerDepartmentStatistics({interval: IntervalEnum.Week}).type)
      .toBe('[PerDepartmentStatistics] Load PerDepartmentStatistics');
  });
});
