import { createAction, props } from '@ngrx/store';

export const loadTailingStatisticss = createAction(
  '[TailingStatistics] Load TailingStatisticss'
);

export const loadTailingStatisticssSuccess = createAction(
  '[TailingStatistics] Load TailingStatisticss Success',
  props<{ data: any }>()
);

export const loadTailingStatisticssFailure = createAction(
  '[TailingStatistics] Load TailingStatisticss Failure',
  props<{ error: any }>()
);
