import { createFeatureSelector, createSelector } from '@ngrx/store';
import { khakiSettingsFeatureKey } from '../index';
import { departmentsTablePageableAttributeKey } from './departments-table-pageable.reducer';

const featureSelector = createFeatureSelector(khakiSettingsFeatureKey);

export const selectDepartmentsTablePageableState = createSelector(
  featureSelector,
  state => state[departmentsTablePageableAttributeKey]
);
