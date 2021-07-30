import {createFeatureSelector, createSelector} from '@ngrx/store';
import { departmentsTableAttributeKey } from './departments-table-pageable/departments-table-pageable.reducer';
import {khakiSettingsFeatureKey} from './index';
import {KhakiSettingsFeatureSm} from './khaki-settings-feature-sm';
import { departmentsPageableAttributeKey } from './reducers/departments-pageable.reducer';
import {departmentsAttributeKey} from './reducers/departments.reducer';
import {employeesAttributeKey} from './reducers/employees.reducer';
import {userProfileAttributeKey} from './reducers/user-profile.reducer';

export const khakiSettingsFeatureSelector = createFeatureSelector(khakiSettingsFeatureKey);

export const userProfileSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[userProfileAttributeKey]
);

export const employeesSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[employeesAttributeKey]
);

export const employeesLoadingSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[employeesAttributeKey].loading
);

export const departmentsSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[departmentsAttributeKey]
);

export const departmentsPageableSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[departmentsTableAttributeKey]
);

export const departmentsPageableLoadingSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[departmentsTableAttributeKey].loading
);
