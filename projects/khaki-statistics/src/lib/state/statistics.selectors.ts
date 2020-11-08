import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
import {StatisticsFeature} from './models/statistics-feature';
import {timeBlockSummariesFeatureKey} from './reducers/time-block-summary.reducer';
import {organizersStatisticsFeatureKey} from './reducers/organizers-statistics.reducer';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const perDepartmentStatisticsSelector = createSelector(featureSelector, (state: StatisticsFeature) => state.perDepartmentStatistics);
export const timeBlockSummarySelector = createSelector(featureSelector, (state: StatisticsFeature) => state[timeBlockSummariesFeatureKey]);
export const organizersStatisticsSelector = createSelector(
  featureSelector,
  (state: StatisticsFeature) => state[organizersStatisticsFeatureKey]
);

