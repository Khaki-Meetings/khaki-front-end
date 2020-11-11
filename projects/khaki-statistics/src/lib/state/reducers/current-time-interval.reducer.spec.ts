import { currentTimeIntervalReducer, initialState } from './current-time-interval.reducer';

describe('CurrentTimeInterval Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = currentTimeIntervalReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
