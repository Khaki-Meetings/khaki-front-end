import {createSelector} from '@ngrx/store';
import {khakiStatisticsFeatureSelector} from '../statistics.selectors';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';

export const statisticsFiltersSelector = createSelector(
  khakiStatisticsFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);

export const statisticsScopeSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].statisticsScope
);

export const statisticsIntervalSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].interval
);

