import {createSelector} from '@ngrx/store';
import {khakiSettingsFeatureSelector} from '../settings.selectors';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';

export const statisticsFiltersSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);
