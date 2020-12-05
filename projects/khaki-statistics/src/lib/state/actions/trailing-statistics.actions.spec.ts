import * as fromTailingStatistics from './trailing-statistics.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadTailingStatisticss', () => {
  it('should return an action', () => {
    expect(fromTailingStatistics.loadTrailingStatistics({interval: IntervalEnum.Day}).type).toBe('[TailingStatistics] Load TailingStatisticss');
  });
});
