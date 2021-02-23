import * as fromStatisticsFilter from './statistics-filter.actions';

describe('loadStatisticsFilters', () => {
  it('should return an action', () => {
    expect(fromStatisticsFilter.setStatisticsFilterAction().type).toBe('[StatisticsFilter] Load StatisticsFilters');
  });
});
