import * as fromOrganizersStatistics from './organizers-statistics.actions';

describe('loadOrganizersStatistics', () => {
  it('should return an action', () => {
    expect(fromOrganizersStatistics.loadOrganizersStatistics().type).toBe('[OrganizersStatistics] Load OrganizersStatistics');
  });
});
