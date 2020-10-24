import {initialState, timeBlockSummariesReducer} from './time-block-summaries.reducer';

describe('TimeBlockSummaries Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = timeBlockSummariesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
