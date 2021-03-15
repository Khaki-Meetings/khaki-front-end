import {createSelector} from '@ngrx/store';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';
import {khakiSettingsFeatureSelector} from '../settings.selectors';

export const statisticsFiltersSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey]
);

export const intervalSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey].interval
);

export const organizerSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey].organizer
);

export const statisticsScopeSelector = createSelector(
  khakiSettingsFeatureSelector,
  state => state[statisticsFiltersAttributeKey].statisticsScope
);
