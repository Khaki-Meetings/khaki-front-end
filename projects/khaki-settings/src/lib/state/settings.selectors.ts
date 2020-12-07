import {createFeatureSelector, createSelector} from '@ngrx/store';
import {khakiProfileFeatureKey} from './index';
import {ProfileFeature} from './models/profile-feature';
import {userProfileFeatureKey} from './reducers/user-profile.reducer';

const featureSelector = createFeatureSelector(khakiProfileFeatureKey);

//export const perDepartmentStatisticsSelector = createSelector(featureSelector, (state: ProfileFeature) => state.perDepartmentStatistics);

//export const timeBlockSummarySelector = createSelector(featureSelector, (state: ProfileFeature) => state[timeBlockSummariesFeatureKey]);

export const userProfileSelector = createSelector(
  featureSelector,
  (state: ProfileFeature) => state[userProfileFeatureKey]
);


