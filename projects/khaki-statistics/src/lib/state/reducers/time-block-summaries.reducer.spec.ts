import {initialState, timeBlockSummariesReducer} from './time-block-summaries.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadTimeBlockSummary,
  loadTimeBlockSummaryFailure,
  loadTimeBlockSummarySuccess
} from '../actions/time-block-summaries.actions';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('TimeBlockSummaries Reducer', () => {
  describe(`${loadTimeBlockSummary.type}`, () => {
    it('should return the previous state', () => {
      const action = loadTimeBlockSummary();

      const result = timeBlockSummariesReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadTimeBlockSummarySuccess.type}`, () => {
    it('should return the new state', () => {
      const timeBlockSummary: TimeBlockSummarySm = {averageCost: 0, timeBlock: IntervalEnum.Day, totalTime: 0, totalCost: 100};
      const action = loadTimeBlockSummarySuccess(timeBlockSummary);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummary});
    });
  });

  describe(`${loadTimeBlockSummaryFailure.type}`, () => {
    it('should set error', () => {
      const timeBlockSummary = {
        error: {message: 'you done fuckeled', name: '1d10t'}
      } as TimeBlockSummarySm;
      const action = loadTimeBlockSummaryFailure(timeBlockSummary.error);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummary});
    });
  });
});
