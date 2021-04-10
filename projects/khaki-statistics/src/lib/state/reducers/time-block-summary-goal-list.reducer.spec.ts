import {initialState, timeBlockSummaryGoalListReducer} from './time-block-summary-goal-list.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import { loadTimeBlockSummaryGoalFailure, loadTimeBlockSummaryGoals, loadTimeBlockSummaryGoalSuccess } from '../actions/time-block-summary-goals.actions';
import { TimeBlockSummaryGoalListSm } from '../models/time-block-summary-goal-list-sm';

describe('TimeBlockSummaryGoalList Reducer', () => {
  describe(`${loadTimeBlockSummaryGoals.type}`, () => {
    it('should return the previous state', () => {
      const action = loadTimeBlockSummaryGoals();

      const result = timeBlockSummaryGoalListReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadTimeBlockSummaryGoalSuccess.type}`, () => {
    it('should return the new state', () => {
      const timeBlockSummary: TimeBlockSummaryGoalListSm = {goals: []};
      const action = loadTimeBlockSummaryGoalSuccess(timeBlockSummary);

      const result = timeBlockSummaryGoalListReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummary});
    });
  });

  describe(`${loadTimeBlockSummaryGoalFailure.type}`, () => {
    it('should set error', () => {
      const timeBlockSummary = {
        error: {message: 'failed', name: 'fail'}
      } as TimeBlockSummaryGoalListSm;
      const action = loadTimeBlockSummaryGoalFailure(timeBlockSummary.error);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...timeBlockSummary});
    });
  });
});
