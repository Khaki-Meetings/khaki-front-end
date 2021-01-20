import * as fromSetStartEnd from './set-interval.actions';
import {IntervalSe} from './interval-se.enum';

describe('setIntervalAction', () => {
  it('should return an action', () => {
    expect(fromSetStartEnd.setIntervalAction({interval: IntervalSe.Week}).type).toBe('[Khaki Statistics] Set Interval');
  });
});
