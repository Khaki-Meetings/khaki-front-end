import * as fromOrganizersStatistics from './organizers-statistics.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadOrganizersStatistics', () => {
  it('should return an action', () => {
    expect(fromOrganizersStatistics.loadOrganizersStatisticsAction({interval: IntervalEnum.Week}).type)
      .toBe('[OrganizersStatistics] Load OrganizersStatistics');
  });
});
