import * as fromTailingStatistics from './trailing-statistics.actions';

describe('loadTailingStatisticss', () => {
  it('should return an action', () => {
    expect(fromTailingStatistics.loadTrailingStatistics().type).toBe('[TailingStatistics] Load TailingStatisticss');
  });
});
