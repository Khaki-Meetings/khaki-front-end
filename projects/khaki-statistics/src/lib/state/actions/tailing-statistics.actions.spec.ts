import * as fromTailingStatistics from './tailing-statistics.actions';

describe('loadTailingStatisticss', () => {
  it('should return an action', () => {
    expect(fromTailingStatistics.loadTailingStatisticss().type).toBe('[TailingStatistics] Load TailingStatisticss');
  });
});
