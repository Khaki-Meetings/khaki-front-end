import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
// import {KhakiStatisticsFeatureSm} from './models/khaki-statistics-feature-sm';
// import { departmentsListFeatureKey } from './reducers/departments-list.reducer';

export const khakiStatisticsFeatureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

/*
export const departmentsListLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[departmentsListFeatureKey].loading
);

export const departmentsStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[perDepartmentStatisticsFeatureKey].loading
);
*/
