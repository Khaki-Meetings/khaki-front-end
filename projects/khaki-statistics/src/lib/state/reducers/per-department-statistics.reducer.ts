import {createReducer, on} from '@ngrx/store';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {loadPerDepartmentStatisticsSuccess} from '../actions/per-department-statistics.actions';
import {HistorianService, LogLevel} from '@natr/historian';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

const logger = new HistorianService(LogLevel.ALL, perDepartmentStatisticsFeatureKey);

export const initialState: DepartmentsStatisticsSm = {
  departmentsStatistics: [],
  errors: [],
  interval: null
};


export const perDepartmentStatisticsReducer = createReducer(
  initialState,
  on(
    loadPerDepartmentStatisticsSuccess,
    (state, action) => {
      logger.debug('department success', state, action);
      const {type, ...newState} = {...state, ...action};
      logger.debug('department success, new state', newState);
      return newState;
    }
  )
);
