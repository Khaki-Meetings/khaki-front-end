import {createAction, props} from '@ngrx/store';
import { DepartmentsStatisticsAggSm } from '../models/departments-statistics-agg-sm';
import {ErrorSm} from '../models/error-sm';

export const loadPerDepartmentStatistics = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics',
);

export const loadPerDepartmentStatisticsSuccess = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Success',
  props<DepartmentsStatisticsAggSm>()
);

export const loadPerDepartmentStatisticsFailure = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Failure',
  props<ErrorSm>()
);
