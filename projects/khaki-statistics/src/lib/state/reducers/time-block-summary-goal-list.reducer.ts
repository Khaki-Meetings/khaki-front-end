import {createReducer, on} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {HistorianService, LogLevel} from '@natr/historian';
import { TimeBlockSummaryResponseDto } from '../../services/models/time-block-summary-response-dto';
import { TimeBlockSummaryGoalSm } from '../models/time-block-summary-goal-sm';
import { loadTimeBlockSummaryGoals, loadTimeBlockSummaryGoalFailure, loadTimeBlockSummaryGoalSuccess } from '../actions/time-block-summary-goals.actions';
import { TimeBlockSummaryGoalResponseDto } from '../../services/models/time-block-summary-goal-response-dto';
import { TimeBlockSummaryGoalsResponseDto } from '../../services/models/time-block-summary-goals-response-dto';
import { TimeBlockSummaryGoalListSm } from '../models/time-block-summary-goal-list-sm';

export const timeBlockSummaryGoalsFeatureKey = 'timeBlockSummaryGoals';

export const timeBlockIntSummariesFeatureKey = 'timeBlockIntSummaries';
export const timeBlockExtSummariesFeatureKey = 'timeBlockExtSummaries';

const logger = new HistorianService(LogLevel.DEBUG, 'TimeBlockSummaryReducer');

export const initialState: TimeBlockSummaryGoalListSm = {
  goals: [],
  loading: false
};
/*
export const initialCompState: TimeBlockSummaryGoalsResponseDto = {
  goals: [],
  loading: false
};*/

export const timeBlockSummaryGoalListReducer = createReducer(
  initialState,
  on(
    loadTimeBlockSummaryGoals,
    state => ({...state, loading: true})
  ),
  on(
    loadTimeBlockSummaryGoalSuccess,
    (state, action) => {
        console.debug('timeBlockSummaryGoal state', state);  // was natr-historian  this.logger.debug
        console.debug('action', action);  // was natr-historian  this.logger.debug
      const newState =
        {
          ...state,
          ...action,
          loading: false
        };
        console.debug('newState', newState);  // was natr-historian  this.logger.debug
      return newState;
    }
  ),
  on(
    loadTimeBlockSummaryGoalFailure,
    (state, action) => (
      {error: {...action}, loading: false}
    )
  )
);
