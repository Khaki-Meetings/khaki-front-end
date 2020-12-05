import {initialState, trailingStatisticsReducer} from './trailing-statistics.reducer';
import {loadTrailingStatistics, loadTrailingStatisticsFailure, loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('TrailingStatistics Reducer', () => {
  describe(`${loadTrailingStatistics.type}`, () => {
    it('should return the previous state', () => {
      const action = loadTrailingStatistics({interval: IntervalEnum.Day});

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadTrailingStatisticsSuccess.type}`, () => {
    it('should return the new state', () => {
      const trailingStatistics = {
        timeBlock: IntervalEnum.Year,
        timeBlockSummaries: [
          {totalCost: 1000}
        ]
      } as TrailingStatisticsSm;
      const action = loadTrailingStatisticsSuccess(trailingStatistics);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...trailingStatistics});
    });
  });

  describe(`${loadTrailingStatisticsFailure.type}`, () => {
    it('should set error', () => {
      const trailingStatistics = {
        errors: [
          {message: 'you done fuckeled', name: '1d10t'}
        ]
      } as TrailingStatisticsSm;
      const action = loadTrailingStatisticsFailure(trailingStatistics.errors[0]);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...trailingStatistics});
    });
  });
});
