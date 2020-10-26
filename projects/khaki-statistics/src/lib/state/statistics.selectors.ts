import { createFeatureSelector, createSelector } from '@ngrx/store';
import {khakiStatisticsFeatureKey} from './index';
import {StatisticsFeature} from './models/statistics-feature';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const perDepartmentStatisticsSelector = createSelector(featureSelector, (state: StatisticsFeature) => state.perDepartmentStatistics);

