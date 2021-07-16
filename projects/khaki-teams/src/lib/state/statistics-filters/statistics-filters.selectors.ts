import {createSelector} from '@ngrx/store';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import { teamMembersFeatureSelector } from '../teams.selectors';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';

export const statisticsFiltersSelector = createSelector(
    teamMembersFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);

export const statisticsOrganizerSelector = createSelector(
  teamMembersFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].organizer
);

export const statisticsScopeSelector = createSelector(
  teamMembersFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].statisticsScope
);

export const statisticsIntervalSelector = createSelector(
  teamMembersFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].interval
);

export const statisticsDepartmentSelector = createSelector(
  teamMembersFeatureSelector,
  (state: KhakiStatisticsFeatureSm) => state[statisticsFiltersAttributeKey].department
);
