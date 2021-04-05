import {createReducer, on} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {loadTimeBlockSummary, loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {HistorianService, LogLevel} from '@natr/historian';
import { TimeBlockSummaryResponseDto } from '../../services/models/time-block-summary-response-dto';

export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const timeBlockIntSummariesFeatureKey = 'timeBlockIntSummaries';
export const timeBlockExtSummariesFeatureKey = 'timeBlockExtSummaries';

const logger = new HistorianService(LogLevel.DEBUG, 'TimeBlockSummaryReducer');

export const initialState: TimeBlockSummarySm = {
  averageCost: 0,
  timeBlock: IntervalEnum.Year,
  totalCost: 0,
  totalSeconds: 0,
  loading: false
};

export const initialCompState: TimeBlockSummaryResponseDto = {
  averageCost: 0,
  totalCost: 0,
  totalSeconds: 0,
  interval: IntervalEnum.Year,
  totalMeetings: 0,
  meetingCount: 0,
  averageStaffSeconds: 0,
  numEmployees: 0,
  meetingLengthSeconds: 0,
  numWorkdays: 0,
  totalMeetingAttendees: 0,
  totalMeetingInternalAttendees: 0
};

export const timeBlockSummaryReducer = createReducer(
  initialState,
  on(
    loadTimeBlockSummary,
    state => ({...state, loading: true})
  ),
  on(
    loadTimeBlockSummarySuccess,
    (state, action) => {
        console.debug('timeBlockSummary state', state);  // was natr-historian  this.logger.debug
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
    loadTimeBlockSummaryFailure,
    (state, action) => (
      {error: {...action}, loading: false}
    )
  )
);
