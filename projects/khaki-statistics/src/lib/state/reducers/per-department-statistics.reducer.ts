import {createReducer} from '@ngrx/store';
import {PerDepartmentStatistics} from '../models/per-department-statistics';


export const perDepartmentStatisticsFeatureKey = 'perDepartmentStatistics';

export const initialState: PerDepartmentStatistics = {
};


export const perDepartmentStatisticsReducer = createReducer(
  initialState,

);

