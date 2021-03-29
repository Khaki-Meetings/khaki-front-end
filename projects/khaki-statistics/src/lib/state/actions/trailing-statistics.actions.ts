import {createAction, props} from '@ngrx/store';
import {ErrorSm} from '../models/error-sm';
import { TrailingStatisticsAggSm } from '../models/trailing-statistics-agg-sm';

export const loadTrailingStatistics = createAction(
  '[TrailingStatistics] Load TrailingStatistics',
);

export const loadTrailingStatisticsSuccess = createAction(
  '[TrailingStatistics] Load TrailingStatistics Success',
  props<TrailingStatisticsAggSm>()
);

export const loadTrailingStatisticsFailure = createAction(
  '[TrailingStatistics] Load TrailingStatistics Failure',
  props<ErrorSm>()
);
