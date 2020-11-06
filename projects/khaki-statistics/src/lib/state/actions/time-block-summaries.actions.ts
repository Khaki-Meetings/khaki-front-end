import { createAction, props } from '@ngrx/store';
import {ErrorSm} from '../models/errorSm';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';

export const loadTimeBlockSummary = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary'
);

export const loadTimeBlockSummarySuccess = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Success',
  props<TimeBlockSummarySm>()
);

export const loadTimeBlockSummaryFailure = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Failure',
  props<ErrorSm>()
);
