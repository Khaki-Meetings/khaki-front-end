import {createSelector} from '@ngrx/store';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';
import {khakiSettingsFeatureSelector} from '../settings.selectors';

export const statisticsFiltersSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);
