import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
import {StatisticsFeature} from './models/statistics-feature';
import {timeBlockSummariesFeatureKey} from './reducers/time-block-summary.reducer';
import {organizersStatisticsFeatureKey} from './reducers/organizers-statistics.reducer';
import {trailingStatisticsFeatureKey} from './reducers/trailing-statistics.reducer';
import {statisticsFiltersFeatureKey} from './reducers/statistics-filters.reducer';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const perDepartmentStatisticsSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state.perDepartmentStatistics
);

export const timeBlockSummarySelector = createSelector(
  featureSelector,
  state => state[timeBlockSummariesFeatureKey]
);

export const organizersStatisticsSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[organizersStatisticsFeatureKey]
);

export const trailingStatisticsSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[trailingStatisticsFeatureKey]
);

export const currentTimeIntervalSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[statisticsFiltersFeatureKey].interval
);

export const statisticsFiltersSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[statisticsFiltersFeatureKey]
);

export const statisticsFilterSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[statisticsFiltersFeatureKey].filter
);
