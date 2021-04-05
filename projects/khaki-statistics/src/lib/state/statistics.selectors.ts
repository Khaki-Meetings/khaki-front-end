import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
import {KhakiStatisticsFeatureSm} from './models/khaki-statistics-feature-sm';
import {timeBlockSummariesFeatureKey} from './reducers/time-block-summary.reducer';
import {organizersStatisticsFeatureKey} from './reducers/organizers-statistics.reducer';
import {meetingsListFeatureKey} from './reducers/meetings-list.reducer';
import {trailingStatisticsFeatureKey} from './reducers/trailing-statistics.reducer';
import {perDepartmentStatisticsFeatureKey} from './reducers/per-department-statistics.reducer';
import { organizersAggregateStatisticsFeatureKey } from './reducers/organizers-aggregate-statistics.reducer';
import { timeBlockSummaryGoalsFeatureKey } from './reducers/time-block-summary-goal-list.reducer';

export const khakiStatisticsFeatureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const perDepartmentStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state.perDepartmentStatistics
);

export const timeBlockSummarySelector = createSelector(
  khakiStatisticsFeatureSelector,
  state => state[timeBlockSummariesFeatureKey]
);

export const timeBlockSummaryGoalsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[timeBlockSummaryGoalsFeatureKey]
);

export const organizersStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersStatisticsFeatureKey]
);

export const organizersAggregateStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersAggregateStatisticsFeatureKey]
);

export const meetingsListSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[meetingsListFeatureKey]
);

export const trailingStatisticsSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[trailingStatisticsFeatureKey]
);

export const trailingStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[trailingStatisticsFeatureKey].loading
);

export const organizersStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersStatisticsFeatureKey].loading
);

export const organizersAggregateStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[organizersAggregateStatisticsFeatureKey].loading
);

export const meetingsListLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[meetingsListFeatureKey].loading
);

export const departmentsStatisticsLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[perDepartmentStatisticsFeatureKey].loading
);

export const timeBlockSummaryLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[timeBlockSummariesFeatureKey].loading
);

export const timeBlockSummaryGoalLoadingSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[timeBlockSummaryGoalsFeatureKey].loading
);
