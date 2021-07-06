import { createFeatureSelector, createSelector } from '@ngrx/store';
import { khakiSettingsFeatureKey } from '../index';
import { employeesTablePageableAttributeKey } from './employees-table-pageable.reducer';

const featureSelector = createFeatureSelector(khakiSettingsFeatureKey);

export const selectEmployeesTablePageableState = createSelector(
  featureSelector,
  state => state[employeesTablePageableAttributeKey]
);
