import { createAction, props } from '@ngrx/store';

export const loadPerDepartmentStatisticss = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatisticss'
);

export const loadPerDepartmentStatisticssSuccess = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatisticss Success',
  props<{ data: any }>()
);

export const loadPerDepartmentStatisticssFailure = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatisticss Failure',
  props<{ error: any }>()
);
