import {createReducer} from '@ngrx/store';
import {PerDepartmentStatisticsSm} from '../models/per-department-statistics-sm';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

export const initialState: PerDepartmentStatisticsSm = {
  departmentStatistics: undefined,
  errors: []
};


export const perDepartmentStatisticsReducer = createReducer(
  initialState,

);

