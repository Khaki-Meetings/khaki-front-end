import * as fromSetStatisticsFilter from './set-statistics-filter.actions';

describe('loadSetStatisticsFilters', () => {
  it('should return an action', () => {
    expect(fromSetStatisticsFilter.setStatisticsFiltersAction().type).toBe('[SetStatisticsFilter] Load SetStatisticsFilters');
  });
});
