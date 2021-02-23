import * as fromSetStatisticsFilters from './set-statistics-filters.actions';

describe('loadSetStatisticsFilterss', () => {
  it('should return an action', () => {
    expect(fromSetStatisticsFilters.setStatisticsFiltersAction().type).toBe('[SetStatisticsFilters] Load SetStatisticsFilterss');
  });
});
