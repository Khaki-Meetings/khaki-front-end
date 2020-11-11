import {createAction, props} from '@ngrx/store';
import {PerDepartmentStatisticsSm} from '../models/per-department-statistics-sm';
import {ErrorSm} from '../models/errorSm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadPerDepartmentStatistics = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics',
  props<SetCurrentTimeIntervalActionProp>()
);

export const loadPerDepartmentStatisticsSuccess = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Success',
  props<PerDepartmentStatisticsSm>()
);

export const loadPerDepartmentStatisticsFailure = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Failure',
  props<ErrorSm>()
);
