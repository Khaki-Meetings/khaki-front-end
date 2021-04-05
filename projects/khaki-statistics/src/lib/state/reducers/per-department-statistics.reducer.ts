import {createReducer, on} from '@ngrx/store';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {HistorianService, LogLevel} from '@natr/historian';
import { DepartmentsStatisticsAggSm } from '../models/departments-statistics-agg-sm';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

const logger = new HistorianService(LogLevel.ALL, perDepartmentStatisticsFeatureKey);

const initialDeptState: DepartmentsStatisticsSm = {
 departmentsStatistics: [],
 loading: false
};

export const initialState: DepartmentsStatisticsAggSm = {
  internal: initialDeptState,
  external: initialDeptState,
  loading: false
};

export const perDepartmentStatisticsReducer = createReducer(
  initialState,
  on(loadPerDepartmentStatistics, state => ({...state, loading: true})),
  on(loadPerDepartmentStatisticsFailure, state => ({...state, loading: false})),
  on(
    loadPerDepartmentStatisticsSuccess,
    (state, action) =>
      (
        {
          ...state,
          internal: action.internal,
          external: action.external,
          loading: false
        }
      )
  )
);
