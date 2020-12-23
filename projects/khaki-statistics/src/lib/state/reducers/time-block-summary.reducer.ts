import {Action, createReducer, on} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {loadTimeBlockSummaryFailure, loadTimeBlockSummarySuccess} from '../actions/time-block-summaries.actions';
import {ErrorSm} from '../models/errorSm';
import {Utilities} from '../../services/utilities';

export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const initialState: TimeBlockSummarySm = {
  averageCost: 0,
  timeBlock: IntervalEnum.Year,
  totalCost: 0,
  totalSeconds: 0
};


export const timeBlockSummaryReducer = createReducer(
  initialState,
  on(
    loadTimeBlockSummarySuccess,
    (state: TimeBlockSummarySm, action: Action | TimeBlockSummarySm) => {
      const {type, ...newState} = {...state, ...action};
      newState.formattedTotalSeconds = Utilities.formatHrsMins(newState.totalSeconds);
      newState.formattedAverageStaffSeconds = Utilities.formatHrsMins(newState.averageStaffSeconds);
      return newState;
    }
  ),
  on(loadTimeBlockSummaryFailure, (state: TimeBlockSummarySm, action: Action | ErrorSm) => ({error: {message: 'error'}}))
);
