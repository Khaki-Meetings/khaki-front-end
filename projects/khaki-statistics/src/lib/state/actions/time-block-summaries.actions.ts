import { createAction, props } from '@ngrx/store';
import {SinceTimeBlockSummariesSm} from '../models/since-time-block-summaries-sm';
import {ErrorSm} from '../models/errorSm';

export const loadTimeBlockSummaries = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummariss'
);

export const loadTimeBlockSummariesSuccess = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummaries Success',
  props<SinceTimeBlockSummariesSm>()
);

export const loadTimeBlockSummariesFailure = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummaries Failure',
  props<ErrorSm>()
);
