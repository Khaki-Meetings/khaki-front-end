import {setStatisticsScopeAction} from './set-statistics-scope.actions';

describe('setStatisticsScopeAction', () => {
  it('should return an action', () => {
    expect(setStatisticsScopeAction({scope: undefined}).type).toBe('[Khaki Statistics] Set Interval');
  });
});
