import {createAction, props} from '@ngrx/store';
import {ErrorSm} from '../models/error-sm';
import { TimeBlockSummaryAggSm } from '../models/time-block-summary-agg-sm';

export const loadTimeBlockSummary = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary',
);

export const loadTimeBlockSummarySuccess = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Success',
  props<TimeBlockSummaryAggSm>()
);

export const loadTimeBlockSummaryFailure = createAction(
  '[TimeBlockSummary] Load TimeBlockSummary Failure',
  props<ErrorSm>()
);
