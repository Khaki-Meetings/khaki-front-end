import { createAction, props } from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {ErrorSm} from '../models/errorSm';
import {IntervalEnum} from '../../services/models/interval.enum';

export const loadTrailingStatistics = createAction(
  '[TrailingStatistics] Load TrailingStatistics',
  props<{interval: IntervalEnum}>()
);

export const loadTrailingStatisticsSuccess = createAction(
  '[TrailingStatistics] Load TrailingStatistics Success',
  props<TrailingStatisticsSm>()
);

export const loadTrailingStatisticsFailure = createAction(
  '[TrailingStatistics] Load TrailingStatistics Failure',
  props<ErrorSm>()
);
