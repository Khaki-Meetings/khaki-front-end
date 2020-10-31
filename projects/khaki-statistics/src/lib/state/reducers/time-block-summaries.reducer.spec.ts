import {initialState, timeBlockSummariesReducer} from './time-block-summaries.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadTimeBlockSummaries,
  loadTimeBlockSummariesFailure,
  loadTimeBlockSummariesSuccess
} from '../actions/time-block-summaries.actions';
import {SinceTimeBlockSummariesSm} from '../models/since-time-block-summaries-sm';

describe('TimeBlockSummaries Reducer', () => {
  describe(`${loadTimeBlockSummaries.type}`, () => {
    it('should return the previous state', () => {
      const action = loadTimeBlockSummaries();

      const result = timeBlockSummariesReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadTimeBlockSummariesSuccess.type}`, () => {
    it('should return the new state', () => {
      const timeBlockSummaries = {
        week: {totalCost: 100},
        month: {totalTime: 100},
        year: {averageCost: 299}
      } as SinceTimeBlockSummariesSm;
      const action = loadTimeBlockSummariesSuccess(timeBlockSummaries);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummaries});
    });
  });

  describe(`${loadTimeBlockSummariesFailure.type}`, () => {
    it('should set error', () => {
      const timeBlockSummaries = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as SinceTimeBlockSummariesSm;
      const action = loadTimeBlockSummariesFailure(timeBlockSummaries.errors[0]);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummaries});
    });
  });
});
