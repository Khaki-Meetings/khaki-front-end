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

export const statisticsOrganizerSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].organizer
);

export const statisticsAttendeeSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].attendee
);

export const statisticsDepartmentSelector = createSelector(
  khakiStatisticsFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].department
);
