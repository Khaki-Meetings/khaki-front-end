import {createAction, props} from '@ngrx/store';
import {ErrorSm} from '../models/error-sm';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadTimeBlockSummary = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary',
);

export const loadTimeBlockSummarySuccess = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Success',
  props<TimeBlockSummarySm>()
);

export const loadTimeBlockSummaryFailure = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Failure',
  props<ErrorSm>()
);
