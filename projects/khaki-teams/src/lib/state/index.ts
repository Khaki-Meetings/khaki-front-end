import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {spinnerAttributeKey, spinnerReducer} from './reducers/spinner.reducer';
import {
  teamMembersTablePageableAttributeKey,
  teamMembersTablePageableReducer
} from './team-members-table-pageable/team-members-table-pageable.reducer';
import {statisticsFiltersAttributeKey, statisticsFiltersReducer} from './statistics-filters/statistics-filters.reducer';
import { teamMembersFeatureKey, teamMembersReducer } from './reducers/team-members.reducer';
import { TeamsFeatureSm } from './teams-feature-sm';
import { teamsFiltersAttributeKey, teamsFiltersReducer } from './team-filters/teams-filters.reducer';
import { meetingsListFeatureKey, meetingsListReducer } from './reducers/meetings-list.reducer';
import { meetingsTablePageableAttributeKey, meetingsTablePageableReducer } from './meetings-table-pageable/meetings-table-pageable.reducer';

export const teamsFeatureKey = 'teams';
export const khakiStatisticsFeatureKey = 'khakiStatistics';

export const reducers: ActionReducerMap<TeamsFeatureSm> = {
  [teamMembersTablePageableAttributeKey]: teamMembersTablePageableReducer,
  [meetingsTablePageableAttributeKey]: meetingsTablePageableReducer,
  [teamMembersFeatureKey]: teamMembersReducer,
  [spinnerAttributeKey]: spinnerReducer,
  [statisticsFiltersAttributeKey]: statisticsFiltersReducer,
  [teamsFiltersAttributeKey]: teamsFiltersReducer,
  [meetingsListFeatureKey]: meetingsListReducer
};

export const metaReducers: MetaReducer<TeamsFeatureSm>[] = [];
