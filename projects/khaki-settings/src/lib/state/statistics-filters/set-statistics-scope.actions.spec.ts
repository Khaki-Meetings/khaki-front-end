import * as fromSetStatisticsScope from './set-statistics-scope.actions';

describe('loadSetStatisticsScopes', () => {
  it('should return an action', () => {
    expect(fromSetStatisticsScope.setStatisticsScopeAction().type).toBe('[SetStatisticsScope] Load SetStatisticsScopes');
  });
});
