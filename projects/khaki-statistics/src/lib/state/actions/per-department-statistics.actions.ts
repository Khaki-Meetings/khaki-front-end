import { createAction, props } from '@ngrx/store';

export const loadPerDepartmentStatistics = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics'
);

export const loadPerDepartmentStatisticsSuccess = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Success',
  props<{ data: any }>()
);

export const loadPerDepartmentFailure = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Failure',
  props<{ error: any }>()
);
