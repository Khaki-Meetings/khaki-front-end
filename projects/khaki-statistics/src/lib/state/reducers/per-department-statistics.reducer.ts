import {createReducer, on} from '@ngrx/store';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {
  loadPerDepartmentStatistics,
  loadPerDepartmentStatisticsFailure,
  loadPerDepartmentStatisticsSuccess
} from '../actions/per-department-statistics.actions';
import {HistorianService, LogLevel} from '@natr/historian';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

const logger = new HistorianService(LogLevel.ALL, perDepartmentStatisticsFeatureKey);

export const initialState: DepartmentsStatisticsSm = {
  departmentsStatistics: [],
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
          departmentsStatistics: action.departmentsStatistics,
          loading: false
        }
      )
  )
);
