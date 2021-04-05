import * as fromOrganizersStatistics from './organizers-aggregate-statistics.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadOrganizersAggregateStatistics', () => {
  it('should return an action', () => {
    expect(fromOrganizersStatistics.loadOrganizersAggregateStatisticsAction().type)
      .toBe('[OrganizersAggregateStatistics] Load OrganizersAggregateStatistics');
  });
});
