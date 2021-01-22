import * as fromLoadSharedStatistics from './load-shared-statistics.actions';

describe('loadSharedStatistics', () => {
  it('should return an action', () => {
    expect(fromLoadSharedStatistics.loadSharedStatisticsAction().type).toBe('[Khaki Settings] Load Shared Statistics');
  });
});
