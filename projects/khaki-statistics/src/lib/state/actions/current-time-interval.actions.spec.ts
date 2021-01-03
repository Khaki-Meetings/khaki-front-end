import * as fromCurrentTimeInterval from './current-time-interval.actions';
import {IntervalSe} from '../models/interval-se';

describe('loadCurrentTimeIntervals', () => {
  it('should return an action', () => {
    expect(fromCurrentTimeInterval.setCurrentTimeIntervalAction({interval: IntervalSe.Week}).type)
      .toBe('[CurrentTimeInterval] Load CurrentTimeIntervals');
  });
});
