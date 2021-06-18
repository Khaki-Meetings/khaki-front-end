import { createFeatureSelector, createSelector } from '@ngrx/store';
import { teamsFeatureKey } from '../index';
import {teamMembersTablePageableAttributeKey} from './team-members-table-pageable.reducer';

const featureSelector = createFeatureSelector(teamsFeatureKey);

export const selectTeamMembersTablePageableState = createSelector(
  featureSelector,
  state => state[teamMembersTablePageableAttributeKey]
);
