import * as fromCurrentTimeInterval from './current-time-interval.actions';

describe('loadCurrentTimeIntervals', () => {
  it('should return an action', () => {
    expect(fromCurrentTimeInterval.setCurrentTimeIntervalAction().type).toBe('[CurrentTimeInterval] Load CurrentTimeIntervals');
  });
});
