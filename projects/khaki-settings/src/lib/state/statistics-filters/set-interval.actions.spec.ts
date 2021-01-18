import * as fromSetInterval from './set-interval.actions';

describe('loadSetIntervals', () => {
  it('should return an action', () => {
    expect(fromSetInterval.setIntervalAction().type).toBe('[SetInterval] Load SetIntervals');
  });
});
