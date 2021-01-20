import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiSettingsFeatureKey} from './index';
import {KhakiSettingsFeatureSm} from './khaki-settings-feature-sm';
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

export const departmentsSelector = createSelector(
  khakiSettingsFeatureSelector,
  (state: KhakiSettingsFeatureSm) => state[departmentsAttributeKey]
);


