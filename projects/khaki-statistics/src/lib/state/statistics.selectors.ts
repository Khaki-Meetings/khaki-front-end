import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
import {KhakiStatisticsFeatureSm} from './models/khaki-statistics-feature-sm';
import {timeBlockSummariesFeatureKey} from './reducers/time-block-summary.reducer';
import {organizersStatisticsFeatureKey} from './reducers/organizers-statistics.reducer';
import {trailingStatisticsFeatureKey} from './reducers/trailing-statistics.reducer';
import {perDepartmentStatisticsFeatureKey} from './reducers/per-department-statistics.reducer';

export const khakiStatisticsFeatureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const perDepartmentStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state.perDepartmentStatistics
);

export const timeBlockSummarySelector = createSelector(
  khakiStatisticsFeatureSelector,
  state => state[timeBlockSummariesFeatureKey]
);

export const organizersStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersStatisticsFeatureKey]
);

export const trailingStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[trailingStatisticsFeatureKey]
);

export const trailingSStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[trailingStatisticsFeatureKey].loading
);

export const organizersStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersStatisticsFeatureKey].loading
);

export const departmentsStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[perDepartmentStatisticsFeatureKey].loading
);

export const timeBlockSummaryLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[timeBlockSummariesFeatureKey].loading
);
