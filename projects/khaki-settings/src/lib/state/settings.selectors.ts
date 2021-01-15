import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiProfileFeatureKey} from './index';
import {ProfileFeature} from './models/profile-feature';
import { departmentsAttributeKey } from './reducers/departments.reducer';
import {employeesAttributeKey} from './reducers/employees.reducer';
import { userProfileAttributeKey } from './reducers/user-profile.reducer';

const featureSelector = createFeatureSelector(khakiProfileFeatureKey);

// export const perDepartmentStatisticsSelector = createSelector(featureSelector, (state: ProfileFeature) => state.perDepartmentStatistics);

// export const timeBlockSummarySelector = createSelector(featureSelector, (state: ProfileFeature) => state[timeBlockSummariesFeatureKey]);

export const userProfileSelector = createSelector(
  featureSelector,
  (state: ProfileFeature) => state[userProfileAttributeKey]
);

export const employeesSelector = createSelector(
  featureSelector,
  (state: ProfileFeature) => state[employeesAttributeKey]
);

export const departmentsSelector = createSelector(
  featureSelector,
  (state: ProfileFeature) => state[departmentsAttributeKey]
);


