import {createAction, props} from '@ngrx/store';
import {ErrorSm} from '../models/error-sm';
import { TimeBlockSummaryGoalListSm } from '../models/time-block-summary-goal-list-sm';

export const loadTimeBlockSummaryGoals = createAction(
  '[TimeBlockSummaryGoalListSm] Load TimeBlockSummaryGoalListSm',
);

export const loadTimeBlockSummaryGoalSuccess = createAction(
  '[TimeBlockSummaryGoalListSm] Load TimeBlockSummaryGoalListSm Success',
  props<TimeBlockSummaryGoalListSm>()
);

export const loadTimeBlockSummaryGoalFailure = createAction(
  '[TimeBlockSummaryGoalListSm] Load TimeBlockSummaryGoalListSm Failure',
  props<ErrorSm>()
);
