import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TeamsFeatureSm } from './teams-feature-sm';
import { teamsFeatureKey } from './index';
import { teamMembersFeatureKey } from './reducers/team-members.reducer';

export const teamMembersFeatureSelector = createFeatureSelector(teamsFeatureKey);

export const teamMembersSelector = createSelector(
  teamMembersFeatureSelector,
  (state: TeamsFeatureSm) => state[teamMembersFeatureKey]
);

export const teamMembersLoadingSelector = createSelector(
  teamMembersFeatureSelector,
  (state: TeamsFeatureSm) => state[teamMembersFeatureKey].loading
);
