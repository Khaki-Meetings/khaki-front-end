import {createAction, props} from '@ngrx/store';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {ErrorSm} from '../models/errorSm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadPerDepartmentStatistics = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics',
  props<SetCurrentTimeIntervalActionProp>()
);

export const loadPerDepartmentStatisticsSuccess = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Success',
  props<DepartmentsStatisticsSm>()
);

export const loadPerDepartmentStatisticsFailure = createAction(
  '[PerDepartmentStatistics] Load PerDepartmentStatistics Failure',
  props<ErrorSm>()
);
