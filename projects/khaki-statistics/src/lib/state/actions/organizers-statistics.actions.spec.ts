import * as fromOrganizersStatistics from './organizers-statistics.actions';

describe('loadOrganizersStatisticss', () => {
  it('should return an action', () => {
    expect(fromOrganizersStatistics.loadOrganizersStatistics().type).toBe('[OrganizersStatistics] Load OrganizersStatisticss');
  });
});
