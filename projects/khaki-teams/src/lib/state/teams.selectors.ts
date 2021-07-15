import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TeamsFeatureSm } from './teams-feature-sm';
import { teamsFeatureKey } from './index';
import { teamMembersFeatureKey } from './reducers/team-members.reducer';
import { meetingsListFeatureKey } from './reducers/meetings-list.reducer';

export const teamMembersFeatureSelector = createFeatureSelector(teamsFeatureKey);
export const teamsFeatureSelector = createFeatureSelector(teamsFeatureKey);

export const teamMembersSelector = createSelector(
  teamMembersFeatureSelector,
  (state: TeamsFeatureSm) => state[teamMembersFeatureKey]
);

export const teamMembersLoadingSelector = createSelector(
  teamMembersFeatureSelector,
  (state: TeamsFeatureSm) => state[teamMembersFeatureKey].loading
);

export const meetingsListSelector = createSelector(
  teamsFeatureSelector,
  (state: TeamsFeatureSm) => state[meetingsListFeatureKey]
);

export const meetingsListLoadingSelector = createSelector(
  teamsFeatureSelector,
  (state: TeamsFeatureSm) => state[meetingsListFeatureKey].loading
);
