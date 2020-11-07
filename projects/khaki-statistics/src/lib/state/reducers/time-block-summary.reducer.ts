import {Action, createReducer, on} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/errorSm';


export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const initialState: TimeBlockSummarySm = {
  averageCost: 0,
  timeBlock: IntervalEnum.Year,
  totalCost: 0,
  totalTime: 0
};


export const timeBlockSummaryReducer = createReducer(
  initialState,
  on(loadTimeBlockSummarySuccess, (state: TimeBlockSummarySm, action: Action | TimeBlockSummarySm) => ({...state, ...action})),
  on(loadTimeBlockSummaryFailure, (state: TimeBlockSummarySm, action: Action | ErrorSm) => ({error: {message: 'error'}}))
);

