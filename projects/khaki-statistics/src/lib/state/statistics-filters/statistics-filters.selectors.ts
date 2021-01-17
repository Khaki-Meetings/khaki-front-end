import { createFeatureSelector, createSelector } from '@ngrx/store';
import {khakiStatisticsFeatureSelector} from '../statistics.selectors';
import {statisticsFiltersAttributeKey} from '../statistics-filters.reducer';

export const statisticsFiltersSelector = createSelector(
  khakiStatisticsFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);
