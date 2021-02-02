import * as fromSetStatisticsFilters from './set-statistics-filters.actions';

describe('setStatisticsFilters', () => {
  it('should return an action', () => {
    expect(fromSetStatisticsFilters.setStatisticsFiltersAction.type).toBe('[Khaki Settings] Set Statistics Filters');
  });
});
