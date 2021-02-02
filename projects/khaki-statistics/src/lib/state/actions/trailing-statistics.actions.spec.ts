import * as fromTailingStatistics from './trailing-statistics.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadTrailingStatistics', () => {
  it('should return an action', () => {
    expect(fromTailingStatistics.loadTrailingStatistics.type).toBe('[TrailingStatistics] Load TrailingStatistics');
  });
});
