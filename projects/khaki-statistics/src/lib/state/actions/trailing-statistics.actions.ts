import {createAction, props} from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {ErrorSm} from '../models/error-sm';

export const loadTrailingStatistics = createAction(
  '[TrailingStatistics] Load TrailingStatistics',
);

export const loadTrailingStatisticsSuccess = createAction(
  '[TrailingStatistics] Load TrailingStatistics Success',
  props<TrailingStatisticsSm>()
);

export const loadTrailingStatisticsFailure = createAction(
  '[TrailingStatistics] Load TrailingStatistics Failure',
  props<ErrorSm>()
);

