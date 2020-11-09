import {createReducer, on} from '@ngrx/store';
import {PerDepartmentStatisticsSm} from '../models/per-department-statistics-sm';
import {loadPerDepartmentStatisticsSuccess} from '../actions/per-department-statistics.actions';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

export const initialState: PerDepartmentStatisticsSm = {
  departmentStatistics: [],
  errors: []
};


export const perDepartmentStatisticsReducer = createReducer(
  initialState,
  on(
    loadPerDepartmentStatisticsSuccess,
    (state, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);

