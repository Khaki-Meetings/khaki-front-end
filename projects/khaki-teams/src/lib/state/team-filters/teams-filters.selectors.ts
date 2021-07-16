import {createSelector} from '@ngrx/store';
import { KhakiTeamsFeatureSm } from '../models/khaki-teams-feature-sm';
import { teamMembersFeatureSelector } from '../teams.selectors';
import { teamsFiltersAttributeKey } from './teams-filters.reducer';

export const teamsFiltersSelector = createSelector(
    teamMembersFeatureSelector,
  state => state[teamsFiltersAttributeKey]
);

export const teamsAttendeeSelector = createSelector(
  teamMembersFeatureSelector,
    //  state => state[statisticsFiltersAttributeKey].department
  (state: KhakiTeamsFeatureSm) => state[teamsFiltersAttributeKey].attendee
);
